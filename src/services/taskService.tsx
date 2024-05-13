import ENV from "./../config/base-env"

interface loginType {
  status?: string
  keyword?: string
}

export const getList = (params: any | loginType) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/fe-test-1?${new URLSearchParams(params)}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  }).then((res) => res.json())
}

export const add = (params: any) => {
  const token: any = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('name', params?.name)
  formData.append('description', params?.description)
  return fetch(`${ENV.API}/fe-test-1/create`, {
    method: 'post',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    },
  }).then((res) => res.json())
}

export const sort = (data: any) => {
  const token: any = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('data', data)
  return fetch(`${ENV.API}/fe-test-1/sort`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    },
    body: data
  }).then((res) => res.json())
}

export const complete = (params: any) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/fe-test-1/complete/${params}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  }).then((res) => res.json())
}

export const todo = (params: any) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/fe-test-1/todo/${params}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  }).then((res) => res.json())
}

export const detail = (params: any) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/fe-test-1/detail/${params}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  }).then((res) => res.json())
}

export const edit = (params: any, id: any) => {
  const token: any = localStorage.getItem('token')
  const formData = new FormData()
  formData.append('name', params?.name)
  formData.append('description', params?.description)
  formData.append('_method', 'put')
  return fetch(`${ENV.API}/fe-test-1/edit/${id}`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    },
    body: formData
  }).then((res) => res.json())
}

export const remove = (params: any) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/fe-test-1/delete/${params}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420"
    }
  }).then((res) => res.json())
}
