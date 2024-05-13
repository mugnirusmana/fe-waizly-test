import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { TESTBE } from "../services"
import { setSuccessAxios, setErrorAxios } from "../config/helper"

interface Props {
    data: any
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: any
}

const initialState: Props = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const slice = createSlice({
  name: "beTest7",
  initialState,
  reducers: {
    reducerBeTest7Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest7: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest7Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest7Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest7Default,
  reducerBeTest7,
  reducerBeTest7Success,
  reducerBeTest7Failed
} = slice.actions

export const setDefaultBeTest7 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest7Default())
  }
}

export const getBeTest7 = () => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest7())
    TESTBE.test7()
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest7Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest7Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest7Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer