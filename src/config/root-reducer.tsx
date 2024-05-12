import { combineReducers } from "@reduxjs/toolkit"
import auth from "./../redux/authSlice"
import signUp from "../redux/signUpSlice"
import listTodo from "../redux/listTodoSlice"
import listComplete from "../redux/listCompleteSlice"
import createTask from "../redux/createTaskSlice"
import sortTask from "../redux/sortTaskSlice"
import deleteTask from "../redux/deleteTaskSlice"
import completeTask from "../redux/completeTaslSlice"
import todoTask from "../redux/todoTaskSlice"
import editTask from "../redux/editTaskSlice"

const rootReducer = combineReducers({
    auth,
    signUp,
    listTodo,
    listComplete,
    createTask,
    sortTask,
    deleteTask,
    completeTask,
    todoTask,
    editTask,
})

export default rootReducer
