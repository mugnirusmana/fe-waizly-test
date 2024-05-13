import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { IoEye } from "@react-icons/all-files/io5/IoEye"
import { IoEyeOff } from "@react-icons/all-files/io5/IoEyeOff"

import { ImgLanscape } from "./../../assets"

import Input from "./../../components/auth/input"
import Button from "./../../components/auth/button"
import Alert from "./../../components/auth/alert"

import { useDispatch, useSelector } from "react-redux"
import { RootState, RootDispatch } from "../../config/store"
import { setDefaultSignUp, setSignUp } from "../../redux/signUpSlice"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<RootDispatch>()
  const { signUp } = useSelector((state: RootState) => state)

  const [showForm, setShowForm] = useState('opacity-0')
  const [name, setName] = useState({
		value: "",
		isError: false,
		errorMessage: ""
	})
  const [username, setUsername] = useState({
		value: "",
		isError: false,
		errorMessage: ""
	})
  const [email, setEmail] = useState({
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
		} = signUp

		if (!isLoading && isSuccess) {
      setReset()
      setAlertGlobal({
				title: 'Sign Up',
				message: 'Sign up has been successfull',
				show: true
			})
		}

		if (!isLoading && isError) {
			setAlertGlobal({
				title: 'Sign In',
				message: errorMessage??'',
				show: true
			})
      setName({
				...name,
				isError: errorMeta?.error?.name? true : false,
				errorMessage: errorMeta?.error?.name??''
			})
			setUsername({
				...username,
				isError: errorMeta?.error?.username? true : false,
				errorMessage: errorMeta?.error?.username??''
			})
      setEmail({
				...email,
				isError: errorMeta?.error?.email? true : false,
				errorMessage: errorMeta?.error?.email??''
			})
			setPassword({
				...password,
				isError: errorMeta?.error?.password? true : false,
				errorMessage: errorMeta?.error?.password??''
			})
		}
  }, [signUp])

  const setReset = () => {
    setName({value: '', isError: false, errorMessage: ''})
    setUsername({value: '', isError: false, errorMessage: ''})
    setEmail({value: '', isError: false, errorMessage: ''})
    setPassword({value: '', isError: false, errorMessage: ''})
  }

  return (
    <div className="w-full h-full p-5 flex items-center justify-center relative text-white text-base">
      <img src={ImgLanscape} alt="bg" className="w-full h-full object-cover absolute top-0 left-0" />
      <div className="w-full h-full bg-black opacity-50 absolute top-0 left-0" />
      
      <div className={`w-full tablet:w-1/3 h-fit backdrop-blur-lg border border-white rounded flex flex-col items-center p-10 gap-5 drop-shadow-lg shadow-lg duration-100 ${showForm}`}>
        <span className="w-full flex items-center justify-center font-bold text-2xl pb-5">Register</span>

        <Input
					type="text"
					name={"name"}
					validate={{
						fields: {
							required: true,
							min: 3,
							max: 50,
						},
						customMessage: {
							required: 'Name is required',
							min: 'Name minimum 3 characters',
							max: 'Name maximum 50 characters',
						}
					}}
					isError={name.isError}
					errorMessage={name.errorMessage}
					placeholder={"Name"}
					value={name.value}
					onChange={(e: any) => setName(e)}
					onClearText={(e: any) => setName(e)}
				/>

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
							required: 'Username is required',
							min: 'Username minimum 3 characters',
							max: 'Username maximum 50 characters',
						}
					}}
					isError={username.isError}
					errorMessage={username.errorMessage}
					placeholder={"Username"}
					value={username.value}
					onChange={(e: any) => setUsername(e)}
					onClearText={(e: any) => setUsername(e)}
				/>

        <Input
					type="email"
					name={"email"}
					validate={{
						fields: {
							required: true,
							min: 3,
							max: 50,
              regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						},
						customMessage: {
							required: 'Email is required',
							min: 'Email minimum 3 characters',
							max: 'Email maximum 50 characters',
							regex: 'Email format is invalid',
						}
					}}
					isError={email.isError}
					errorMessage={email.errorMessage}
					placeholder={"Email"}
					value={email.value}
					onChange={(e: any) => setEmail(e)}
					onClearText={(e: any) => setEmail(e)}
				/>

        <Input
					type={showPassword ? "text" : "password"}
					name={"password"}
					validate={{
						fields: {
							required: true,
							min: 3,
							max: 15,
						},
            customMessage: {
							required: 'Password is required',
							min: 'Password minimum 3 characters',
							max: 'Password maximum 15 characters',
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

        <div className="w-full flex flex-col tablet:flex-row gap-5">
          <Button
            label={"Reset"}
            isLoading={signUp?.isLoading}
            disabled={signUp?.isLoading}
            onClick={() => setReset()}
          />

          <Button
            label={"Sign Up"}
            isLoading={signUp?.isLoading}
            disabled={signUp?.isLoading}
            onClick={() => {
              let params = {
                name: name?.value,
                username: username?.value,
                email: email?.value,
                password: password?.value,
              }
              dispatch(setSignUp(params))
            }}
          />
        </div>

        <div className="flex flex-row gap-1 text-xs">
					<span className="whitespace-nowrap">Having account?</span>
					<span
						className="cursor-pointer font-bold"
						onClick={() => navigate('/login')}
					>Login now</span>
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

            dispatch(setDefaultSignUp())

            if (signUp?.isSuccess) navigate('/login')

          }, 1500)
				}}
			/>

    </div>
      
  )
}

export default Register