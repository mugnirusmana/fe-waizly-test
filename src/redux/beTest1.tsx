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

interface ParamsListProps {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
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
  name: "beTest1",
  initialState,
  reducers: {
    reducerBeTest1Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest1: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest1Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest1Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest1Default,
  reducerBeTest1,
  reducerBeTest1Success,
  reducerBeTest1Failed
} = slice.actions

export const setDefaultBeTest1 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest1Default())
  }
}

export const getBeTest1 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest1())
    TESTBE.test1(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          setTimeout(() => {
            dispatch(reducerBeTest1Success(setSuccessAxios(response)))
          }, 1000)
        } else {
          dispatch(reducerBeTest1Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest1Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer