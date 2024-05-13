import axios from "axios"
import ENV from "./../config/base-env"

interface getListType {
  status?: string
  keyword?: string
}

export const getList = (params: getListType) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1`, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const add = (data: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const sort = (data: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/sort`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const complete = (id: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/complete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const todo = (id: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/todo/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const detail = (id: any) => {
  const token = localStorage.getItem('token')
  return axios.get(`${ENV.API}/fe-test-1/detail/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const edit = (data: any, id: any) => {
  const token = localStorage.getItem('token')
  return axios.post(`${ENV.API}/fe-test-1/edit/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}

export const remove = (id: any) => {
  const token = localStorage.getItem('token')
  return axios.delete(`${ENV.API}/fe-test-1/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  })
}
