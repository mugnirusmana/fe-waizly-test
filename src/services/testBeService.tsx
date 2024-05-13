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
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
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
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface test3Type {
  page?: string | number
  limit?: string | number
  departments?: Array<string>
}

export const test3 = (params: test3Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-3`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface test4Type {
  limit: string | number
}

export const test4 = (params: any | test4Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-4`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface test5Type {
  limit: string | number
}

export const test5 = (params: any | test5Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-5`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface test6Type {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
}

export const test6 = (params: any | test6Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-6`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const test7 = () => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-7`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

interface test8Type {
  department?: string
}

export const test8 = (params: any | test8Type) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/be-test-2/test-8`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}