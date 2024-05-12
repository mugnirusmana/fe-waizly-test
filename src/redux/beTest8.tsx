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
  department?: string
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
  name: "beTest8",
  initialState,
  reducers: {
    reducerBeTest8Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest8: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest8Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest8Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest8Default,
  reducerBeTest8,
  reducerBeTest8Success,
  reducerBeTest8Failed
} = slice.actions

export const setDefaultBeTest8 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest8Default())
  }
}

export const getBeTest8 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest8())
    TESTBE.test8(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest8Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest8Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest8Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer