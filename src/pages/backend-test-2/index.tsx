import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest2, setDefaultBeTest2 } from './../../redux/beTest2'

import Select from "../../components/select"
import Alert from "../../components/alert"

const BackendTest2 = () => {
  const [jobTitle, setJobTitle] = useState('Manager')
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })

  const { beTest2 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [jobTitle])

  useEffect(() => {
    let {
      isSuccess,
      isLoading,
      isError,
      errorMessage
    } = beTest2

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest2())
    }

    if (!isLoading && isError) {
      setGlobalAlert({
        show: true,
        message: errorMessage??'Someting went wrong'
      })
    }
  }, [beTest2])

  const getData = () => {
    let params = {
      job_title: jobTitle 
    }
    dispatch(getBeTest2(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 2"
        data={[
          { title: 'Test 2', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <div className="w-full flex flex-col">
            <span className="w-fit flex font-bold">Filter</span>
            <div className="w-full laptop:w-1/3 flex flex-row gap-2">
              <Select
                value={jobTitle}
                data={[
                  'Manager',
                  'Analyst',
                  'Developer'
                ]}
                onChange={(item) => setJobTitle(item)}
              />
            </div>
          </div>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs">
          <span className="font-bold">Info:</span>
          <span>Count employees by job title <strong>({jobTitle})</strong></span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          {beTest2?.data?.data?.length > 0 ? (
            <div className="w-full flex flex-col border border-gray-400 rounded p-2 text-sm">
              <div className="flex flex-row">
                <span className="w-[80px]">Job Title</span>
                <span className="w-[10px]">:</span>
                <span><strong>{beTest2?.data?.job_title}</strong></span>
              </div>

              <div className="flex flex-row">
                <span className="w-[80px]">Total</span>
                <span className="w-[10px]">:</span>
                <span><strong>{beTest2?.data?.total}</strong></span>
              </div>
              <div className="flex flex-row">
                <span className="w-[80px]">Employee{beTest2?.data?.data?.length > 1 ?'s':''}</span>
                <span className="w-[10px]">:</span>
                <span><strong>{beTest2?.data?.data?.map((item: any, index: number) => index === 0 ? `${item?.name}, ` : item?.name)}</strong></span>
              </div>
            </div>
          ) : (
            <div className="w-full italic text-xs border border-gray-400 rounded p-2">No data available for {jobTitle}</div>
          )}
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

      <Loader show={beTest2?.isLoading} />
    </div>
  )
}

export default BackendTest2