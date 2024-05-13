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
  departments?: Array<string>
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
  name: "beTest3",
  initialState,
  reducers: {
    reducerBeTest3Default: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerBeTest3: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerBeTest3Success: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerBeTest3Failed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerBeTest3Default,
  reducerBeTest3,
  reducerBeTest3Success,
  reducerBeTest3Failed
} = slice.actions

export const setDefaultBeTest3 = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerBeTest3Default())
  }
}

export const getBeTest3 = (params: ParamsListProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerBeTest3())
    TESTBE.test3(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerBeTest3Success(setSuccessAxios(response)))
        } else {
          dispatch(reducerBeTest3Failed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerBeTest3Failed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer