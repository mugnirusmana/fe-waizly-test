import axios from "axios"
import ENV from "./../config/base-env"

interface loginType {
  username?: string
  password?: string
  is_forever?: boolean
}

export const login = (params: loginType) => {
  return axios.post(`${ENV.API}/login`, params, {
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface registerType {
  name?: string
  username?: string
  email?: string
  password?: string
}

export const register = (params: registerType) => {
  return axios.post(`${ENV.API}/register`, params, {
    headers: {
      "ngrok-skip-browser-warning": "69420"
    }
  })
}