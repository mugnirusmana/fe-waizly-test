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

interface ParamsListTodoProps {
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
  name: "listTodo",
  initialState,
  reducers: {
    reducerListTodoDefault: (state: Props) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
    reducerListTodo: (state: Props) => {
      state.isLoading = true
      state.isSuccess = false
      state.isError = false
      state.errorMessage = null
      state.errorMeta = {}
    },
    reducerListTodoSuccess: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.errorMessage = null
      state.data = payload
    },
    reducerListTodoFailed: (state: Props, { payload }) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload?.message
      state.errorMeta = payload?.errorMeta
    }
  }
})

const {
  reducerListTodoDefault,
  reducerListTodo,
  reducerListTodoSuccess,
  reducerListTodoFailed
} = listTaskSlice.actions

export const setDefaultTodo = () => {
  return async (dispatch: Dispatch) => {
    return dispatch(reducerListTodoDefault())
  }
}

export const getTodo = (params: ParamsListTodoProps) => {
  return async (dispatch: Dispatch) => {
    dispatch(reducerListTodo())
    TASK.getList(params)
      .then((response) => {
        if (response?.data?.meta?.is_success) {
          dispatch(reducerListTodoSuccess(setSuccessAxios(response)))
        } else {
          dispatch(reducerListTodoFailed(setErrorAxios(response)))
        }
      })
      .catch((error) => dispatch(reducerListTodoFailed(setErrorAxios(error?.response))))
  }
}

export default listTaskSlice.reducer