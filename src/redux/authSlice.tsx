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
    removeToken: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = {}
      state.errorMeta = {}
    },
    defaultLogIn: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    logIn: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    logInSuccess: (state: Props, payload) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload?.payload
    },
    logInFailed: (state: Props, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.payload?.message
      state.errorMeta = payload?.payload?.errorMeta
    }
  }
})

export const { removeToken, defaultLogIn, logIn, logInSuccess, logInFailed } = authSlice.actions

export const signIn = (params: ParamsSignInProps) => {
  return async (dispatch: any) => {
    dispatch(logIn())
    AUTH.login(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(logInSuccess(setSuccessAxios(response)))
        } else {
          dispatch(logInFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => {
        dispatch(logInFailed(setErrorAxios(error?.response)))
      })
  }
}

export const defaultSignIn = () => {
  return async (dispatch: Function) => {
    dispatch(defaultLogIn())
  }
}

export const logOut = () => {
  return async (dispatch: Function) => {
    dispatch(logIn())
    setTimeout(() => {
      dispatch(removeToken())
    }, 1500)
  }
}

export default authSlice.reducer