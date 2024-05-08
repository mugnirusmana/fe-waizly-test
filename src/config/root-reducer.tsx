import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from "./../redux/authSlice"
import SignUpSlice from "../redux/signUpSlice"
import ListTodoSlice from "../redux/listTodoSlice"
import ListCompleteSlice from "../redux/listCompleteSlice"
import SortTaskSlice from "../redux/sortTaskSlice"

const rootReducer = combineReducers({
    auth: AuthSlice,
    signUp: SignUpSlice,
    listTodo: ListTodoSlice,
    listComplete: ListCompleteSlice,
    sortTask: SortTaskSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer