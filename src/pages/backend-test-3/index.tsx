import { useEffect, useState } from "react"
import _ from "lodash"

import Breadcrumb from "./../../components/breadcrumb"
import Checkbox from "../../components/checkbox"
import Alert from "../../components/alert"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest3, setDefaultBeTest3 } from './../../redux/beTest3'

import { formatCurrency } from "./../../config/helper"

const BackendTest3 = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    message: '',
  })
  const [pages, setPages] = useState([])
  const departmentList = ['Sales', 'Marketing', 'IT']
  const [departments, setDepartments] = useState(['Sales', 'Marketing'])

  const { beTest3 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [page, limit, departments])

  useEffect(() => {
    let {
      data,
      isSuccess,
      isLoading,
      isError,
      errorMessage
    } = beTest3

    if (!isLoading && isSuccess) {
      setPage(data?.paginate?.current_page??page)
      setLimit(data?.paginate?.per_page??limit)
      let newPages: any = []
      data?.paginate?.pages?.forEach((item: any) => {
        newPages = newPages.concat(item?.value)
      })
      setPages(newPages)
      dispatch(setDefaultBeTest3())
    }

    if (!isLoading && isError) {
      setGlobalAlert({
        show: true,
        message: errorMessage??'Someting went wrong'
      })
    }
  }, [beTest3])

  const getData = () => {
    let params = {
      page: page,
      limit: limit,
      departments: departments
    }
    dispatch(getBeTest3(params))
  }

  const setValueDeparments = (stat: boolean, field: string, departmentsBeforeUpdate: Array<string>) => {
    let result = _.filter(departmentList, (item: any) => {
      let check = _.find(departments, (item_c) => item_c === item)
      if (check && check !== field) {
        return true
      } else {
        if (item === field && stat) {
          return true
        } else {
          return false
        }
      }
    })

    if (result?.length > 0) {
      setPage(1)
      setDepartments(result)
    } else {
      setGlobalAlert({
        show: true,
        message: 'Minimum set 1 departments'
      })
      setDepartments(departmentsBeforeUpdate)
    }
  }

  const renderFilter = () => {
    return departmentList?.map((item: string, index: number) => {
      return <Checkbox
        key={index}
        title={item}
        isChecked={departments?.filter((item_d: string) => item_d === item)?.length > 0 ? true  : false}
        onCheck={(e: any) => setValueDeparments(e, item, departments)}
        type="circle"
        checkedClass="bg-gray-700"
        textClass="text-gray-700"
        borderClass="border-gray-700"
      />
    })
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 3"
        data={[
          { title: 'Test 3', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
          <div className="w-full flex flex-col">
            <span className="w-fit flex font-bold">Filter</span>
            <div className="w-full flex flex-col laptop:flex-row gap-3 laptop:w-1/3">
              {renderFilter()}
            </div>
          </div>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5">
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
                constumRender: (item) => formatCurrency(parseInt(item?.salary??0))
              }
            ]}
            data={beTest3?.data?.list??[]}
            withNo={true}
            withAction={false}
            withFooter={false}
            perPage={limit}
            currentPage={page}
            totalPage={beTest3?.data?.paginate?.total_page??0}
            totalData={beTest3?.data?.paginate?.total_data??0}
            pages={pages??[]}
            onChangePerPage={(limit) => setLimit(limit)}
            onNextPage={(page) => setPage(page)}
            onPrevPage={(page) => setPage(page)}
            onGoToPage={(page) => setPage(page)}
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

      <Loader show={beTest3?.isLoading} />
    </div>
  )
}

export default BackendTest3