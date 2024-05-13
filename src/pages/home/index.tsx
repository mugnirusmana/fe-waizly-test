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

                <div className={`w-full tablet:w-1/2 laptop:w-1/3 h-fit backdrop-blur-lg border border-white rounded flex flex-col items-center p-10 gap-5 drop-shadow-lg shadow-lg duration-100 ${showForm}`}>
                    <div className="w-full flex flex-col items-center justify-center pb-5">
                        <span className="w-full flex items-center justify-center text-xl  text-center">FRONTEND TECHNICAL TEST</span>
                        <span className="w-full flex items-center justify-center text-xl  text-center font-bold">WAIZLY</span>
                    </div>
                    
                    <div className="w-full flex flex-col laptop:flex-row gap-2 p-5">
                        <div className="w-full flex flex-col border border-white rounded p-2 gap-2">
                            <span className="w-full flex items-center justify-center text-xl  text-center">Server 1</span>
                            <div className="w-full flex flex-row gap-2">
                                <div
                                    className="w-full bg-white text-black flex items-center justify-center text-center font-bold text-xs rounded py-2 cursor-pointer duration-100 hover:shadow-lg hover:drop-shadow-lg"
                                    onClick={() => window.location.href = 'https://fe-tech-test-waizly.vercel.app'}
                                >FE</div>
                                <div
                                    className="w-full bg-white text-black flex items-center justify-center text-center font-bold text-xs rounded py-2 cursor-pointer duration-100 hover:shadow-lg hover:drop-shadow-lg"
                                    onClick={() => window.location.href = 'https://f5f7-182-253-124-150.ngrok-free.app'}
                                >BE</div>
                            </div>
                        </div>

                        <div className="w-full flex flex-col border border-white rounded p-2 gap-2">
                            <span className="w-full flex items-center justify-center text-xl  text-center">Server 2</span>
                            <div className="w-full flex flex-row gap-2">
                                <div
                                    className="w-full bg-white text-black flex items-center justify-center text-center font-bold text-xs rounded py-2 cursor-pointer duration-100 hover:shadow-lg hover:drop-shadow-lg"
                                    onClick={() => window.location.href = 'https://fe-test-waizly.ade-nova.my.id'}
                                >FE</div>
                                <div
                                    className="w-full bg-white text-black flex items-center justify-center text-center font-bold text-xs rounded py-2 cursor-pointer duration-100 hover:shadow-lg hover:drop-shadow-lg"
                                    onClick={() => window.location.href = 'https://be-test-waizly.ade-nova.my.id'}
                                >BE</div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col laptop:flex-row gap-5">
                        <Button
                            label={"FE Github"}
                            onClick={() =>  window.location.href = 'https://github.com/mugnirusmana/fe-waizly-test'}
                        />

                        <Button
                            label={"BE Github"}
                            onClick={() =>  window.location.href = 'https://github.com/mugnirusmana/be-waizly-test'}
                        />
                    </div>

                    <Button
                        label={"Use this server & login"}
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home