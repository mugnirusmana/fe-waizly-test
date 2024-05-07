import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from "./../redux/authSlice"

const rootReducer = combineReducers({
    auth: AuthSlice
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof rootReducer

export default rootReducer