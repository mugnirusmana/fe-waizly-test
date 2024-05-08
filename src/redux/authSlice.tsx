import { createSlice } from "@reduxjs/toolkit"
import { AUTH } from "./../services"
import { setSuccessAxios, setErrorAxios } from "./../config/helper"

interface Props {
    data: any
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: any
}

interface ParamsSignInProps {
    username?: string
    password?: string
    is_forever?: boolean
}

const initialState: Props = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reducerRemoveToken: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = {}
      state.errorMeta = {}
    },
    reducerLoginDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerLogin: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerLoginSuccess: (state: Props, payload) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload?.payload
    },
    reducerLoginFailed: (state: Props, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.payload?.message
      state.errorMeta = payload?.payload?.errorMeta
    }
  }
})

export const { reducerRemoveToken, reducerLoginDefault, reducerLogin, reducerLoginSuccess, reducerLoginFailed } = authSlice.actions

export const signIn = (params: ParamsSignInProps) => {
  return async (dispatch: any) => {
    dispatch(reducerLogin())
    AUTH.login(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerLoginSuccess(setSuccessAxios(response)))
        } else {
          dispatch(reducerLoginFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerLoginFailed(setErrorAxios(error?.response))))
  }
}

export const defaultSignIn = () => {
  return async (dispatch: Function) => {
    dispatch(reducerLoginDefault())
  }
}

export const logOut = () => {
  return async (dispatch: Function) => {
    dispatch(reducerLogin())
    setTimeout(() => {
      dispatch(reducerRemoveToken())
    }, 1500)
  }
}

export default authSlice.reducer