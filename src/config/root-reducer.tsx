import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from "./../redux/authSlice"
import SignUpSlice from "../redux/signUpSlice"
import ListTodoSlice from "../redux/listTodoSlice"
import ListCompleteSlice from "../redux/listCompleteSlice"
import CreateTaskSlice from "../redux/createTaskSlice"
import SortTaskSlice from "../redux/sortTaskSlice"
import DeleteTaskSlice from "../redux/deleteTaskSlice"
import CompleteTaskSlice from "../redux/completeTaslSlice"
import TodoTaskSlice from "../redux/todoTaskSlice"
import EditTaskSlice from "../redux/editTaskSlice"

const rootReducer = combineReducers({
    auth: AuthSlice,
    signUp: SignUpSlice,
    listTodo: ListTodoSlice,
    listComplete: ListCompleteSlice,
    createTask: CreateTaskSlice,
    sortTask: SortTaskSlice,
    deleteTask: DeleteTaskSlice,
    completeTask: CompleteTaskSlice,
    todoTask: TodoTaskSlice,
    editTask: EditTaskSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer