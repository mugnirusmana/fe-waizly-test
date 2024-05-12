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
import beTest1 from "../redux/beTest1"
import beTest2 from "../redux/beTest2"
import beTest3 from "../redux/beTest3"
import beTest4 from "../redux/beTest4"
import beTest5 from "../redux/beTest5"
import beTest6 from "../redux/beTest6"
import beTest7 from "../redux/beTest7"
import beTest8 from "../redux/beTest8"

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
    beTest1,
    beTest2,
    beTest3,
    beTest4,
    beTest5,
    beTest6,
    beTest7,
    beTest8,
})

export default rootReducer
