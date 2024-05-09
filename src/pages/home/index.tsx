import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { ImgLanscape } from "./../../assets"

import Button from "./../../components/auth/button"

const Home = () => {
    const navigate = useNavigate()

    const [showForm, setShowForm] = useState('opacity-0')

    useEffect(() => {
		setTimeout(() => {setShowForm('opacity-100')}, 1000)
	}, [])

    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
            <div className="w-full h-full p-5 flex items-center justify-center relative text-white text-base">
                <img src={ImgLanscape} alt="bg" className="w-full h-full object-cover absolute top-0 left-0" />
                <div className="w-full h-full bg-black opacity-50 absolute top-0 left-0" />

                <div className={`w-full tablet:w-1/3 h-fit backdrop-blur border border-white rounded flex flex-col items-center p-10 gap-5 drop-shadow-lg shadow-lg duration-100 ${showForm}`}>
                    <div className="w-full flex flex-col items-center justify-center pb-5">
                        <span className="w-full flex items-center justify-center text-xl  text-center">FRONTEND TECHNICAL TEST</span>
                        <span className="w-full flex items-center justify-center text-xl  text-center font-bold">WAIZLY</span>
                    </div>

                    <Button
                        label={"Direct to login page"}
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home