import { useEffect, useState } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest2, setDefaultBeTest2 } from './../../redux/beTest2'

import Select from "../../components/select"
import Input from "../../components/input"

const BackendTest2 = () => {
  const [jobTitle, setJobTitle] = useState('Manager')

  const { beTest2 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [jobTitle])

  useEffect(() => {
    let {
      isSuccess,
      isLoading
    } = beTest2

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest2())
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
          <div className="w-full flex flex-col mb-2">
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
          {beTest2?.data?.job_title ? (
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
            </div>
          ) : null}
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Loader show={beTest2?.isLoading} />
    </div>
  )
}

export default BackendTest2