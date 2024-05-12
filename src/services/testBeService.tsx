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

interface test4Type {
  limit: string | number
}

export const test4 = (params: test4Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-4`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}

interface test5Type {
  limit: string | number
}

export const test5 = (params: test5Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-5`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}

interface test6Type {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
}

export const test6 = (params: test6Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-6`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}

export const test7 = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-7`, {
    headers: {
      Authorization: token
    }
  })
}

interface test8Type {
  department?: string
}

export const test8 = (params: test8Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-8`, {
    headers: {
      Authorization: token
    },
    params: params
  })
}