import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"
import Alert from "../../components/alert"
import Select from "../../components/select"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest4, setDefaultBeTest4 } from './../../redux/beTest4'

import { formatCurrency } from "../../config/helper"

const BackendTest4 = () => {
  const [limit, setLimit] = useState({
    value: 5,
    label: '5 year'
  })
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })

  const { beTest4 } = useSelector((state: RootState) => state)
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
    } = beTest4

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest4())
    }

    if (!isLoading && isError) {
      setGlobalAlert({
        show: true,
        message: errorMessage??'Someting went wrong'
      })
    }
  }, [beTest4])

  const getData = () => {
    let params = {
      limit: limit?.value
    }
    dispatch(getBeTest4(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 4"
        data={[
          { title: 'Test 4', route: '', active: true }
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
                  { value: 1, label: '1 year' },
                  { value: 2, label: '2 years' },
                  { value: 3, label: '3 years' },
                  { value: 4, label: '4 years' },
                  { value: 5, label: '5 years' },
                  { value: 6, label: '6 years' },
                  { value: 7, label: '7 years' },
                  { value: 8, label: '8 years' },
                  { value: 9, label: '9 years' },
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
          <span>Sum average salary for every who was join who joined in the last <strong>{limit?.value}</strong> year{limit?.value > 1 ? 's' :''}</span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          {beTest4?.data?.average > 0 ? (
            <div className="w-full flex flex-col border border-gray-400 rounded p-2 text-sm">
              <div className="flex flex-row">
                <span className="w-[160px]">Limit</span>
                <span className="w-[10px]">:</span>
                <span><strong>{beTest4?.data?.limit}</strong></span>
              </div>

              <div className="flex flex-row">
                <span className="w-[160px]">Average</span>
                <span className="w-[10px]">:</span>
                <span><strong>{beTest4?.data?.average}</strong></span>
              </div>
              <div className="flex flex-row">
                <span className="w-[160px]">Formatted Average</span>
                <span className="w-[10px]">:</span>
                <span><strong>{formatCurrency(beTest4?.data?.average, {locale: 'en-EN', currency: 'USD'})}</strong></span>
              </div>
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

      <Loader show={beTest4?.isLoading} />
    </div>
  )
}

export default BackendTest4