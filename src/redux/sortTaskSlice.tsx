import { Dispatch, createSlice } from "@reduxjs/toolkit"
import { TASK } from "../services"
import { setErrorAxios } from "../config/helper"

interface Props {
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
    errorMessage?: string | null,
    errorMeta: any
}

const initialState: Props = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: null,
  errorMeta: {}
}

export const listTaskSlice = createSlice({
  name: "sortTask",
  initialState,
  reducers: {
    reducerSortTaskDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerSortTask: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerSortTaskSuccess: (state: Props) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
    },
    reducerSortTaskFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerSortTaskDefault,
  reducerSortTask,
  reducerSortTaskSuccess,
  reducerSortTaskFailed
} = listTaskSlice.actions

export const setDefaultSortTask = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerSortTaskDefault())
  }
}

export const setSort = (params: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerSortTask())
    TASK.sort(params)
      .then((response) => {
        if (response?.meta?.is_success) {
          dispatch(reducerSortTaskSuccess())
        } else {
          dispatch(reducerSortTaskFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerSortTaskFailed(setErrorAxios(error?.response))))
  }
}

export default listTaskSlice.reducer