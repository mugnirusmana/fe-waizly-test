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
  name: "beTest6",
  initialState,
  reducers: {
    reducerBeTest6Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest6: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest6Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest6Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest6Default,
  reducerBeTest6,
  reducerBeTest6Success,
  reducerBeTest6Failed
} = slice.actions

export const setDefaultBeTest6 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest6Default())
  }
}

export const getBeTest6 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest6())
    TESTBE.test6(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest6Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest6Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest6Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer