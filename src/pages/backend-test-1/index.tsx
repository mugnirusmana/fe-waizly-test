import { useEffect, useState } from "react"
import moment from "moment"

import Breadcrumb from "./../../components/breadcrumb"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest1, setDefaultBeTest1 } from './../../redux/beTest1'
import Input from "../../components/input"

import { formatCurrency } from "./../../config/helper"

const BackendTest1 = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [pages, setPages] = useState([])
  const [keyword, setKeyword] = useState({
    value: '',
    isError: false,
    errorMessage: ''
  })

  const { beTest1 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [page, limit])

  useEffect(() => {
    let {
      data,
      isSuccess,
      isLoading
    } = beTest1

    if (!isLoading && isSuccess) {
      setPage(data?.paginate?.current_page??page)
      setLimit(data?.paginate?.per_page??limit)
      let newPages: any = []
      data?.paginate?.pages?.forEach((item: any) => {
        newPages = newPages.concat(item?.value)
      })
      setPages(newPages)
      dispatch(setDefaultBeTest1())
    }
  }, [beTest1])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData()
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [keyword])

  const getData = () => {
    let params = {
      page: page,
      limit: limit,
      keyword: keyword?.value
    }
    dispatch(getBeTest1(params))
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 1"
        data={[
          { title: 'Test 1', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <div className="w-full flex flex-col mb-2">
            <span className="w-fit flex font-bold">Filter</span>
            <div className="w-full laptop:w-1/3">
              <Input
                value={keyword?.value}
                onChange={(e) => setKeyword(e)}
                onClearText={(e: any) => setKeyword(e)}
                placeholder="Search by name, job title or department"
              />
            </div>
          </div>
          <Table
            titles={[
              {
                name: 'Name',
                key: 'name',
                position: 'left'
              },
              {
                name: 'Job Title',
                key: 'job_title',
                position: 'left'
              },
              {
                name: 'Salary',
                key: 'salary',
                position: 'left',
                constumRender: (item) => formatCurrency(parseInt(item?.salary??0))
              },
              {
                name: 'Department',
                key: 'department',
                position: 'left'
              },
              {
                name: 'Join Date',
                key: 'join_date',
                position: 'left',
                constumRender: (item) => moment(item?.join_date).format('DD MMMM YYYY'),
              }
            ]}
            data={beTest1?.data?.list??[]}
            withNo={true}
            withAction={false}
            withFooter={false}
            perPage={limit}
            currentPage={page}
            totalPage={beTest1?.data?.paginate?.total_page??0}
            totalData={beTest1?.data?.paginate?.total_data??0}
            pages={pages??[]}
            onChangePerPage={(limit) => setLimit(limit)}
            onNextPage={(page) => setPage(page)}
            onPrevPage={(page) => setPage(page)}
            onGoToPage={(page) => setPage(page)}
          />
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Loader show={beTest1?.isLoading} />
    </div>
  )
}

export default BackendTest1