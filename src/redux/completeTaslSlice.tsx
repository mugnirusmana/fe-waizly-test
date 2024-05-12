import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { TASK } from "../services"
import { setErrorAxios } from "../config/helper"

interface Props {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  errorMessage?: string | null
  errorMeta: any
}

const initialState: Props = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const slice = createSlice({
  name: "completeTask",
  initialState,
  reducers: {
    reducerCompleteTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerCompleteTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerCompleteTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerCompleteTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerCompleteTaskDefault,
  reducerCompleteTask,
  reducerCompleteTaskSuccess,
  reducerCompleteTaskFailed
} = slice.actions

export const setDefaultCompleteTask = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerCompleteTaskDefault())
  }
}

export const setComplete = (params: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerCompleteTask())
    TASK.complete(params)
      .then((response) => {
        if (response?.meta?.is_success) {
          dispatch(reducerCompleteTaskSuccess())
        } else {
          dispatch(reducerCompleteTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerCompleteTaskFailed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer