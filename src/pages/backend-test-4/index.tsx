import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest4, setDefaultBeTest4 } from './../../redux/beTest4'

import Input from "../../components/input"
import Alert from "../../components/alert"
import { formatCurrency } from "../../config/helper"

const BackendTest4 = () => {
  const [limit, setLimit] = useState({
    value: '5',
    isError: false,
    errorMessage: ''
  })
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })

  const { beTest4 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (limit?.value && !limit?.isError) getData()
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
      limit: limit.value
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
              <Input
                value={limit?.value}
                isError={limit?.isError}
                errorMessage={limit?.errorMessage}
                validate={{
                  fields: {
                    max: 1,
                    regex: /^[1-9]*$/
                  },
                  customMessage: {
                    max: 'Filter max 1 digit',
                    regex: 'Only number 1 to 9'
                  }
                }}
                onChange={(e) => setLimit(e)}
                onClearText={(e: any) => setLimit(e)}
              />
            </div>
          </div>
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