import { logOut } from "./../../redux/authSlice"
import { useDispatch } from "react-redux"

const Dashboard = () => {
    const dispatch = useDispatch<any>()

    return (
        <div className="flex flex-row gap-2">
            <span>Dashboard.</span>
            <div className="cursor-pointer" onClick={() => dispatch(logOut())}>Logout</div>
        </div>
    )
}

export default Dashboard