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
  limit: string | number
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
  name: "beTest4",
  initialState,
  reducers: {
    reducerBeTest4Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest4: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest4Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest4Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest4Default,
  reducerBeTest4,
  reducerBeTest4Success,
  reducerBeTest4Failed
} = slice.actions

export const setDefaultBeTest4 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest4Default())
  }
}

export const getBeTest4 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest4())
    TESTBE.test4(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest4Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest4Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest4Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer