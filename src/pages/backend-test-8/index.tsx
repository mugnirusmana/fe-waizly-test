import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest8, setDefaultBeTest8 } from './../../redux/beTest8'

import Select from "../../components/select"
import Alert from "../../components/alert"
import Table from "../../components/table"
import { formatCurrency } from "../../config/helper"

const BackendTest8 = () => {
  const [department, setDepartment] = useState('Sales')
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })

  const { beTest8 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [department])

  useEffect(() => {
    let {
      isSuccess,
      isLoading,
      isError,
      errorMessage
    } = beTest8

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest8())
    }

    if (!isLoading && isError) {
      setGlobalAlert({
        show: true,
        message: errorMessage??'Someting went wrong'
      })
    }
  }, [beTest8])

  const getData = () => {
    let params = {
      department: department 
    }
    dispatch(getBeTest8(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 8"
        data={[
          { title: 'Test 8', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <div className="w-full flex flex-col">
            <span className="w-fit flex font-bold">Filter</span>
            <div className="w-full laptop:w-1/3 flex flex-row gap-2">
              <Select
                value={department}
                data={[
                  'Sales',
                  'Marketing',
                  'IT'
                ]}
                onChange={(item) => setDepartment(item)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs">
          <span className="font-bold">Info:</span>
          <span>Show name and total salary from <strong>store precedure</strong> by input the departments <strong>{department}</strong></span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <Table
            titles={[
              {
                name: 'Name',
                key: 'name'
              },
              {
                name: 'Salary',
                key: 'salary',
                constumRender: (item) => formatCurrency(parseInt(item?.salary ?? 0), { locale: 'en-EN', currency: 'USD' })
              }
            ]}
            withNo
            data={beTest8?.data ?? []}
            currentPage={0}
            totalPage={0}
          />
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Alert
        show={globalAlert?.show}
        title={'Get Data'}
        message={globalAlert?.message}
        type={'error'}
        onCancel={() => {
          setGlobalAlert({
            ...globalAlert,
            show: false,
          })
        }}
      />

      <Loader show={beTest8?.isLoading} />
    </div>
  )
}

export default BackendTest8