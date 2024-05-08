import axios from "axios"

import ENV from "./../config/base-env"

interface loginType {
  username?: string
  password?: string
  is_forever?: boolean
}

export const login = (params: loginType) => {
  return axios.post(`${ENV.API}/login`, params, {})
}

export const register = (params: loginType) => {
  return axios.post(`${ENV.API}/register`, params, {})
}