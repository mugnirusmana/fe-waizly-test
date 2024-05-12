import ENV from "./../config/base-env"

interface test1Type {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
}

export const test1 = (params: any | test1Type) => {
  const token: any = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-1?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test2Type {
  page?: string | number
  limit?: string | number
  job_title?: string | null | undefined
}

export const test2 = (params: any | test2Type) => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-2?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test2Type {
  page?: string | number
  limit?: string | number
  departments?: Array<string>
}

export const test3 = (params: any | test2Type) => {
  let newParams = `page=${params?.page}&limit=${params?.limit}`
  params?.departments?.forEach((item: any, key: number) => {
    newParams = `${newParams}&departments[]=${item}`
  })
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-3?${newParams}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test4Type {
  limit: string | number
}

export const test4 = (params: any | test4Type) => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-4?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test5Type {
  limit: string | number
}

export const test5 = (params: any | test5Type) => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-5?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test6Type {
  page?: string | number
  limit?: string | number
  keyword?: string | null | undefined
}

export const test6 = (params: any | test6Type) => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-6?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

export const test7 = () => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-7`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}

interface test8Type {
  department?: string
}

export const test8 = (params: any | test8Type) => {
  const token = localStorage.getItem('token')
  return fetch(`${ENV.API}/be-test-2/test-8?${new URLSearchParams(params)}`, {
    method: 'GET',
    headers: {
      Authorization: token??''
    }
  }).then((res) => res.json())
}