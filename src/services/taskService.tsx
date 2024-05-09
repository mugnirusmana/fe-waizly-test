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

export const add = (params: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/create`, params, {
    headers: {
      'Authorization': token
    },
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

export const complete = (params: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/complete/${params}`, {
    headers: {
      'Authorization': token
    }
  })
}

export const todo = (params: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/todo/${params}`, {
    headers: {
      'Authorization': token
    }
  })
}

export const detail = (params: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/detail/${params}`, {
    headers: {
      'Authorization': token
    }
  })
}

export const edit = (params: any, id: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/edit/${id}`, params, {
    headers: {
      'Authorization': token
    },
  })
}

export const remove = (params: any) => {
  const token = localStorage.getItem('token')
  return axios.delete(`${ENV.API}/fe-test-1/delete/${params}`, {
    headers: {
      'Authorization': token
    }
  })
}
