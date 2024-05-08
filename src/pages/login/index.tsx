import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IoEye } from "@react-icons/all-files/io5/IoEye"
import { IoEyeOff } from "@react-icons/all-files/io5/IoEyeOff"
import { IoPerson } from "@react-icons/all-files/io5/IoPerson"

import { ImgLanscape } from "./../../assets"

import Input from "./../../components/auth/input"
import Button from "./../../components/auth/button"
import Alert from "./../../components/auth/alert"
import Checkbox from "./../../components/checkbox"

import { signIn, defaultSignIn } from "./../../redux/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../config/root-reducer"

const Login = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch<any>()
	const auth = useSelector((state: RootState) => state?.auth)

	const [showForm, setShowForm] = useState('opacity-0')
	const [username, setUsername] = useState({
		value: "",
		isError: false,
		errorMessage: ""
	})
	const [password, setPassword] = useState({
		value: "",
		isError: false,
		errorMessage: ""
	})
	const [showPassword, setShowPassword] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)
	const [alertGlobal, setAlertGlobal] = useState<{
		title?: string
		message: string
		show: boolean
	}>({
		title: '',
		message: '',
		show: false
	})

	useEffect(() => {
		setTimeout(() => {setShowForm('opacity-100')}, 1000)
	}, [])

	useEffect(() => {
		let {
			isSuccess,
			isLoading,
			isError,
			errorMessage,
			errorMeta
		} = auth

		if (!isLoading && isSuccess) {
			dispatch(defaultSignIn())
		}

		if (!isLoading && isError) {
			setAlertGlobal({
				title: 'Sign In',
				message: errorMessage??'',
				show: true
			})
			setUsername({
				...username,
				isError: errorMeta?.error?.username? true : false,
				errorMessage: errorMeta?.error?.username??''
			})
			setPassword({
				...password,
				isError: errorMeta?.error?.password? true : false,
				errorMessage: errorMeta?.error?.password??''
			})
			dispatch(defaultSignIn())
		}
	}, [auth])

	return (
		<div className="w-full h-full p-5 flex items-center justify-center relative text-white text-base">
			<img src={ImgLanscape} alt="bg" className="w-full h-full object-cover absolute top-0 left-0" />
			<div className="w-full h-full bg-black opacity-50 absolute top-0 left-0" />
			
			<div className={`w-1/3 h-fit backdrop-blur border border-white rounded flex flex-col items-center p-10 gap-5 drop-shadow-lg shadow-lg duration-100 ${showForm}`}>
				<span className="w-full flex items-center justify-center font-bold text-2xl pb-5">LOGIN</span>

				<Input
					type="text"
					name={"username"}
					validate={{
						fields: {
							required: true,
							min: 3,
							max: 50,
						},
						customMessage: {
							required: 'Email or Username is required',
							min: 'Email or Username minimum 3 characters',
							max: 'Email or Username maximum 50 characters',
						}
					}}
					isError={username.isError}
					errorMessage={username.errorMessage}
					placeholder={"Email or Username"}
					value={username.value}
					onChange={(e: any) => setUsername(e)}
					icon={(<IoPerson />)}
					onClearText={(e: any) => setUsername(e)}
				/>

				<Input
					type={showPassword ? "text" : "password"}
					name={"password"}
					validate={{
						fields: {
							required: true,
							max: 50,
						}
					}}
					isError={password.isError}
					errorMessage={password.errorMessage}
					placeholder={"Password"}
					value={password.value}
					onChange={(e: any) => setPassword(e)}
					icon={showPassword ? (<IoEye />) : (<IoEyeOff />)}
					onClickIcon={() => setShowPassword(!showPassword)}
					onClearText={(e: any) => setPassword(e)}
				/>

				<div className="w-full flex flex-row">
					<div className="flex flex-row gap-1 w-full">
						<Checkbox
							isChecked={rememberMe}
							title={'Remember me'}
							textClass="text-white text-xs"
							onCheck={(res: boolean) => setRememberMe(res)}
						/>
					</div>
					{/* <div className="flex flex-row gap-1">
						<span className="whitespace-nowrap text-xs cursor-pointer">Forgot Password?</span>
					</div> */}
				</div>

				<Button
					label={"Sign In"}
					isLoading={auth?.isLoading}
					disabled={auth?.isLoading || username?.isError || password?.isError}
					onClick={() => {
						let params = {
							username: username?.value,
							password: password?.value,
							is_forever: rememberMe
						}
						dispatch(signIn(params))
					}}
				/>

				<div className="flex flex-row gap-1 text-xs">
					<span className="whitespace-nowrap">Did not have acount yet?</span>
					<span
						className="cursor-pointer font-bold"
						onClick={() => navigate('/register')}
					>Register now</span>
				</div>
			</div>

			<Alert
				show={alertGlobal.show}
				title={alertGlobal.title}
				message={alertGlobal.message}
				onCancel={() => {
					setAlertGlobal({
						...alertGlobal,
						show: false
					})

					setTimeout(() => {
						setAlertGlobal({
							show: false,
							title: '',
							message: ''
						})
					}, 1500)
				}}
			/>

		</div>
	)
}

export default Login