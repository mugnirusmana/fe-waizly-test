import { useEffect, useState } from "react"
import _ from "lodash"

import Breadcrumb from "./../../components/breadcrumb"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest6, setDefaultBeTest6 } from './../../redux/beTest6'

import { formatCurrency } from "./../../config/helper"

const BackendTest6 = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [pages, setPages] = useState([])

  const { beTest6 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [page, limit])

  useEffect(() => {
    let {
      data,
      isSuccess,
      isLoading
    } = beTest6

    if (!isLoading && isSuccess) {
      setPage(data?.paginate?.current_page??page)
      setLimit(data?.paginate?.per_page??limit)
      let newPages: any = []
      data?.paginate?.pages?.forEach((item: any) => {
        newPages = newPages.concat(item?.value)
      })
      setPages(newPages)
      dispatch(setDefaultBeTest6())
    }
  }, [beTest6])

  const getData = (selectPage?: number) => {
    let params = {
      page: selectPage??page,
      limit: limit,
    }
    dispatch(getBeTest6(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 6"
        data={[
          { title: 'Test 6', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs">
          <span className="font-bold">Info:</span>
          <span>Show name, salary and average salary of all employees</span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 gap-2">
          <Table
            titles={[
              {
                name: 'Name',
                key: 'name',
                position: 'left'
              },
              {
                name: 'Salary',
                key: 'salary',
                position: 'left',
                constumRender: (item) => formatCurrency(parseInt(item?.salary??0), {locale: 'en-EN', currency: 'USD'})
              },
              {
                name: 'Average Salary of All Employees',
                key: 'average_salary',
                position: 'left',
                constumRender: (item) => formatCurrency(parseInt(item?.average_salary??0), {locale: 'en-EN', currency: 'USD'})
              }
            ]}
            data={beTest6?.data?.list??[]}
            withNo={true}
            withAction={false}
            withFooter={false}
            perPage={limit}
            currentPage={page}
            totalPage={beTest6?.data?.paginate?.total_page??0}
            totalData={beTest6?.data?.paginate?.total_data??0}
            pages={pages??[]}
            onChangePerPage={(limit) => setLimit(limit)}
            onNextPage={(page) => setPage(page)}
            onPrevPage={(page) => setPage(page)}
            onGoToPage={(page) => setPage(page)}
          />
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Loader show={beTest6?.isLoading} />
    </div>
  )
}

export default BackendTest6