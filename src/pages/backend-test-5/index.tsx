import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"
import Alert from "../../components/alert"
import Select from "../../components/select"
import Table from "../../components/table"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest5, setDefaultBeTest5 } from './../../redux/beTest5'

import { formatCurrency } from "../../config/helper"

const BackendTest5 = () => {
  const [limit, setLimit] = useState({
    value: 5,
    label: 'Top 5 Employees'
  })
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })

  const { beTest5 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [limit])

  useEffect(() => {
    let {
      isSuccess,
      isLoading,
      isError,
      errorMessage
    } = beTest5

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest5())
    }

    if (!isLoading && isError) {
      setGlobalAlert({
        show: true,
        message: errorMessage??'Someting went wrong'
      })
    }
  }, [beTest5])

  const getData = () => {
    let params = {
      limit: limit?.value
    }
    dispatch(getBeTest5(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 5"
        data={[
          { title: 'Test 5', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <div className="w-full flex flex-col">
            <span className="w-fit flex font-bold">Filter</span>
            <div className="w-full laptop:w-1/3 flex flex-row gap-2">
              <Select
                value={limit}
                data={[
                  { value: 1, label: 'Top 1 Employee' },
                  { value: 2, label: 'Top 2 Employees' },
                  { value: 3, label: 'Top 3 Employees' },
                  { value: 4, label: 'Top 4 Employees' },
                  { value: 5, label: 'Top 5 Employees' }
                ]}
                itemKey="value"
                itemLabel="label"
                onChange={(item) => setLimit(item)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs">
          <span className="font-bold">Info:</span>
          <span>Show <strong>{limit?.value}</strong> employee{limit?.value > 1 ? 's' :''} with the highest total sales</span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 gap-5">
          {beTest5?.data?.without_group?.length > 0 ? (
            <div className="w-full flex flex-col gap-2 border border-gray-300 laptop:border-0 p-5 laptop:p-0 rounded">
            <span>Without Group By Employee</span>
              <Table
                titles={[
                  {
                    name: 'Name',
                    key: 'name'
                  },
                  {
                    name: 'Sales',
                    key: 'sales',
                    constumRender: (item) => {
                      return formatCurrency(item?.sales, { locale: 'en-EN', currency: 'USD' })
                    }
                  }
                ]}
                data={beTest5?.data?.without_group}
                withNo
                currentPage={0}
                totalPage={0}
              />
            </div>
          ) : null}

          {beTest5?.data?.with_group?.length > 0 ? (
            <div className="w-full flex flex-col gap-2 border border-gray-300 laptop:border-0 p-5 laptop:p-0 rounded">
              <span>Group By Employee</span>
              <Table
                titles={[
                  {
                    name: 'Name',
                    key: 'name'
                  },
                  {
                    name: 'Sales',
                    key: 'sales',
                    constumRender: (item) => {
                      return formatCurrency(item?.sales, { locale: 'en-EN', currency: 'USD' })
                    }
                  }
                ]}
                data={beTest5?.data?.with_group}
                withNo
                currentPage={0}
                totalPage={0}
              />
            </div>
          ) : null}
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

      <Loader show={beTest5?.isLoading} />
    </div>
  )
}

export default BackendTest5