import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { TASK } from "../services"
import { setSuccessAxios, setErrorAxios } from "../config/helper"

interface Props {
    data: any
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: any
}

interface ParamsListCompleteProps {
    status?: string
    keyword?: string
}

const initialState: Props = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const listTaskSlice = createSlice({
  name: "listComplete",
  initialState,
  reducers: {
    reducerListCompleteDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerListComplete: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerListCompleteSuccess: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerListCompleteFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerListCompleteDefault,
  reducerListComplete,
  reducerListCompleteSuccess,
  reducerListCompleteFailed
} = listTaskSlice.actions

export const setDefaultComplete = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerListCompleteDefault())
  }
}

export const getComplete = (params: ParamsListCompleteProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerListComplete())
    TASK.getList(params)
      .then((response) => {
        if (response?.meta?.is_success) {
          dispatch(reducerListCompleteSuccess(setSuccessAxios(response)))
        } else {
          dispatch(reducerListCompleteFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerListCompleteFailed(setErrorAxios(error?.response))))
  }
}

export default listTaskSlice.reducer