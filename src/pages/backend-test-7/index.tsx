import { useEffect, useState } from "react"
import _ from "lodash"

import Breadcrumb from "./../../components/breadcrumb"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest7, setDefaultBeTest7 } from './../../redux/beTest7'

import { formatCurrency } from "./../../config/helper"

const BackendTest7 = () => {
  const [pages, setPages] = useState([])

  const { beTest7 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    let {
      data,
      isSuccess,
      isLoading
    } = beTest7

    if (!isLoading && isSuccess) {
      let newPages: any = []
      data?.paginate?.pages?.forEach((item: any) => {
        newPages = newPages.concat(item?.value)
      })
      setPages(newPages)
      dispatch(setDefaultBeTest7())
    }
  }, [beTest7])

  const getData = (selectPage?: number) => {
    dispatch(getBeTest7())
  }

  const renderAverageSalary = () => {
    let first_data: any = {}
    let result: any = 0
    if (beTest7?.data?.list?.length > 0) {
      first_data = _.first(beTest7?.data?.list)
      result = parseInt(first_data?.average_salary)
    }

    return <div className="">Average Salary: {formatCurrency(result, { locale: 'en-EN', 'currency': 'USD' })}</div>
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 7"
        data={[
          { title: 'Test 7', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5 gap-2">
          <Table
            titles={[
              {
                name: 'Rank',
                key: 'rank_number',
                position: 'left'
              },
              {
                name: 'Name',
                key: 'name',
                position: 'left'
              },
              {
                name: 'Total',
                key: 'amount',
                position: 'left',
                constumRender: (item) => formatCurrency(parseInt(item?.amount ?? 0), { locale: 'en-EN', currency: 'USD' })
              }
            ]}
            data={beTest7?.data ?? []}
            withNo={false}
            withAction={false}
            withFooter={false}
            perPage={0}
            currentPage={0}
            totalPage={0}
          />
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Loader show={beTest7?.isLoading} />
    </div>
  )
}

export default BackendTest7