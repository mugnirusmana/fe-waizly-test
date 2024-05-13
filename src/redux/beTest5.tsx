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
  name: "beTest5",
  initialState,
  reducers: {
    reducerBeTest5Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest5: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest5Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest5Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest5Default,
  reducerBeTest5,
  reducerBeTest5Success,
  reducerBeTest5Failed
} = slice.actions

export const setDefaultBeTest5 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest5Default())
  }
}

export const getBeTest5 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest5())
    TESTBE.test5(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest5Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest5Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest5Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer