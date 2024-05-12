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
  name: "todoTask",
  initialState,
  reducers: {
    reducerTodoTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerTodoTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerTodoTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerTodoTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerTodoTaskDefault,
  reducerTodoTask,
  reducerTodoTaskSuccess,
  reducerTodoTaskFailed
} = slice.actions

export const setDefaultTodoTask = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerTodoTaskDefault())
  }
}

export const setTodo = (params: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerTodoTask())
    TASK.todo(params)
      .then((response) => {
        if (response?.meta?.is_success) {
          dispatch(reducerTodoTaskSuccess())
        } else {
          dispatch(reducerTodoTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerTodoTaskFailed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer