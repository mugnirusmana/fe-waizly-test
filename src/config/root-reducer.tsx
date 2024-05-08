import { combineReducers } from "@reduxjs/toolkit"
import AuthSlice from "./../redux/authSlice"
import SignUpSlice from "../redux/signUpSlice"

const rootReducer = combineReducers({
    auth: AuthSlice,
    signUp: SignUpSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer