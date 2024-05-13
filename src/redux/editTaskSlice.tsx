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
  name: "editTask",
  initialState,
  reducers: {
    reducerEditTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerEditTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerEditTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerEditTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerEditTaskDefault,
  reducerEditTask,
  reducerEditTaskSuccess,
  reducerEditTaskFailed
} = slice.actions

export const setDefaultEditTask = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerEditTaskDefault())
  }
}

export const setEdit = (params: any, id: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerEditTask())
    TASK.edit(params, id)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerEditTaskSuccess())
        } else {
          dispatch(reducerEditTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerEditTaskFailed(setErrorAxios(error?.response))))
  }
}

export default slice.reducer