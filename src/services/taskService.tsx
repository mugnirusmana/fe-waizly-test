import axios from "axios"

import ENV from "./../config/base-env"

interface loginType {
  status?: string
  keyword?: string
}

export const getList = (params: loginType) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1`, {
    headers: {
      'Authorization': token
    },
    params: params
  })
}

export const sort = (data: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/sort`, {
    data: data
  }, {
    headers: {
      'Authorization': token
    },
  })
}
