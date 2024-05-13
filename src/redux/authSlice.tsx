import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { AUTH } from "./../services"
import { setSuccessAxios, setErrorAxios } from "./../config/helper"

interface Props {
    data?: {
      [key: string]: any
    }
    isLoading?: boolean
    isError?: boolean
    isSuccess?: boolean
    errorMessage?: string | null,
    errorMeta?: any,
    isForceLogout?: boolean
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
  errorMeta: {},
  isForceLogout: false,
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
      state.isForceLogout = false
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
    },
    reducerForceLogout: (state: Props, payload) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.isForceLogout = true
      state.data = {}
      state.errorMessage = payload?.payload
    }
  }
})

export const {
  reducerRemoveToken,
  reducerLoginDefault,
  reducerLogin,
  reducerLoginSuccess,
  reducerLoginFailed,
  reducerForceLogout
} = authSlice.actions

export const signIn = (params: ParamsSignInProps) => {

  return async (dispatch: Dispatch) => {
    dispatch(reducerLogin())
    AUTH.login(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          localStorage.setItem('token', response?.data?.data?.access_token)
          dispatch(reducerLoginSuccess(setSuccessAxios(response)))
        } else {
          dispatch(reducerLoginFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerLoginFailed(setErrorAxios(error?.response))))
  }
}

export const defaultSignIn = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerLoginDefault())
  }
}

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerLogin())
    setTimeout(() => {
      dispatch(reducerRemoveToken())
    }, 1500)
  }
}

export const forceLogout = (data: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerForceLogout(data))
  }
}

export default authSlice.reducer