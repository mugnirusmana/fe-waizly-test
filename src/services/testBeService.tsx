import axios from "axios"

import ENV from "./../config/base-env"

interface test1Type {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
}

export const test1 = (params: test1Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-1`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}


interface test2Type {
  page?: string | number
  limit?: string | number
  job_title?: string | null | undefined
}

export const test2 = (params: test2Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-2`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}

interface test2Type {
  page?: string | number
  limit?: string | number
  departments?: Array<string>
}

export const test3 = (params: test2Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-3`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}