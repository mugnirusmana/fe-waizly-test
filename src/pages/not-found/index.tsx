import { useSelector } from "react-redux"
import Button from "../../components/button"
import { RootState } from "../../config/store"
import { useNavigate } from "react-router"

const NotFound = () => {
    const navigate = useNavigate()
    const { auth } = useSelector((state: RootState) => state)
    return (
        <div className="w-screen h-screen bg-gray-200 flex flex-row justify-center">
            <div className="w-[40%] h-fit rounded p-5 gap-5 flex flex-col items-center">
                <span className="text-[6rem] font-bold text-center w-fit text-orange-600">Oops!</span>

                <div className="bg-white h-fit rounded p-5 shadow-lg flex flex-col gap-5">
                    <span className="font-bold text-center">Page Not Found!!!...</span>
                    <span className="text-xs italic text-center">We can't seem to find  the page  your were looking for. Try going back to the previus page page or click the button below</span>
                    <div className="w-full flex flex-row gap-5 justify-center">
                        <Button
                            label="Home"
                            type="submit"
                            customClass="bg-orange-600 border-orange-600"
                            onClick={() => navigate('/')}
                        />
                        {auth?.data?.access_token ? (
                            <Button
                                label="Dashboard"
                                type="submit"
                                customClass="bg-orange-600 border-orange-600"
                                onClick={() => navigate('/dashboard')}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound