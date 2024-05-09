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

export const createTaskSlice = createSlice({
  name: "createTask",
  initialState,
  reducers: {
    reducerCreateTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerCreateTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerCreateTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerCreateTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerCreateTaskDefault,
  reducerCreateTask,
  reducerCreateTaskSuccess,
  reducerCreateTaskFailed
} = createTaskSlice.actions

export const setDefaultCreateTask = () => {
  return async (dispatch: Function) => {
    return dispatch(reducerCreateTaskDefault())
  }
}

export const setCreate = (params: any) => {
  return async (dispatch: Function) => {
    dispatch(reducerCreateTask())
    TASK.add(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerCreateTaskSuccess())
        } else {
          dispatch(reducerCreateTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerCreateTaskFailed(setErrorAxios(error?.response))))
  }
}

export default createTaskSlice.reducer