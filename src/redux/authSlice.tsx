import { Dispatch, createSlice } from "@reduxjs/toolkit"

export interface Props {
    token?: string | null
    data: {}
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: {}
}

interface ParamsSignInProps {
    email?: string | null
    password?: string | null
}

const initialState: Props = {
  token: null,
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
            state.token = null
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
        logInSuccess: (state: Props, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.errorMessage = null
            state.token = action?.payload?.token
            state.data = action?.payload?.data
        },
        logInFailed: (state: Props, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.errorMessage = action?.payload?.message
            state.errorMeta = action?.payload?.errorMeta
        }
    }
})

export const { removeToken, defaultLogIn, logIn, logInSuccess, logInFailed } = authSlice.actions

export const signIn = (params: ParamsSignInProps) => {
    return async (dispatch: Dispatch) => {
      dispatch(logIn())
    }
  }
  
export const defaultSignIn = () => {
    return async (dispatch: Dispatch) => {
        dispatch(defaultLogIn())
    }
}

export const logOut = () => {
    return async (dispatch: Dispatch) => {
        dispatch(logIn())
        setTimeout(() => {
            dispatch(removeToken())
        }, 1500)
    }
}

export default authSlice.reducer;