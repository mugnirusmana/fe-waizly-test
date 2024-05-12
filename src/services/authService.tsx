import ENV from "./../config/base-env"

interface loginType {
  username?: string
  password?: string
  is_forever?: boolean
}

export const login = (params: any | loginType) => {
  const formData = new FormData()
  formData.append('username', params?.username)
  formData.append('password', params?.password)
  formData.append('is_forever', params?.is_forever)
  return fetch(`${ENV.API}/login`, {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}

export const register = (params: any | loginType) => {
  const formData = new FormData()
  formData.append('name', params?.name)
  formData.append('username', params?.username)
  formData.append('email', params?.email)
  formData.append('password', params?.password)
  formData.append('is_forever', params?.is_forever??false)
  return fetch(`${ENV.API}/register`, {
    method: 'post',
    body: formData
  }).then((res) => res.json())
}