import { createSlice } from "@reduxjs/toolkit"
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

export const deleteTaskSlice = createSlice({
  name: "deleteTask",
  initialState,
  reducers: {
    reducerDeleteTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerDeleteTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerDeleteTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerDeleteTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerDeleteTaskDefault,
  reducerDeleteTask,
  reducerDeleteTaskSuccess,
  reducerDeleteTaskFailed
} = deleteTaskSlice.actions

export const setDefaultDeleteTask = () => {
  return async (dispatch: Function) => {
    return dispatch(reducerDeleteTaskDefault())
  }
}

export const setDelete = (params: any) => {
  return async (dispatch: Function) => {
    dispatch(reducerDeleteTask())
    TASK.remove(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerDeleteTaskSuccess())
        } else {
          dispatch(reducerDeleteTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => {
        dispatch(reducerDeleteTaskFailed(setErrorAxios(error?.response)))
      })
  }
}

export default deleteTaskSlice.reducer