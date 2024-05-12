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
  job_title?: string | null | undefined
}

const initialState: Props = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const slice = createSlice({
  name: "beTest2",
  initialState,
  reducers: {
    reducerBeTest2Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest2: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest2Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest2Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest2Default,
  reducerBeTest2,
  reducerBeTest2Success,
  reducerBeTest2Failed
} = slice.actions

export const setDefaultBeTest2 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest2Default())
  }
}

export const getBeTest2 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest2())
    TESTBE.test2(params)
      .then((response) => {
        if (response?.meta?.is_success) {
          dispatch(reducerBeTest2Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest2Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest2Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer