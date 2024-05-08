import { createSlice } from "@reduxjs/toolkit"
import { AUTH } from "../services"
import { setSuccessAxios, setErrorAxios } from "../config/helper"

interface Props {
    data: any
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: any
}

interface ParamsSignUpProps {
    name?: string
    username?: string
    email?: string
    password?: string
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
  name: "signup",
  initialState,
  reducers: {
    reducerSignUpDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerSignUp: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerSignUpSuccess: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerSignUpFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerSignUpDefault,
  reducerSignUp,
  reducerSignUpSuccess,
  reducerSignUpFailed
} = authSlice.actions

export const setDefaultSignUp = () => {
  return async (dispatch: Function) => {
    return dispatch(reducerSignUpDefault())
  }
}

export const setSignUp = (params: ParamsSignUpProps) => {
  return async (dispatch: Function) => {
    dispatch(reducerSignUp())
    AUTH.register(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerSignUpSuccess(setSuccessAxios(response)))
        } else {
          dispatch(reducerSignUpFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerSignUpFailed(setErrorAxios(error?.response))))
  }
}

export default authSlice.reducer