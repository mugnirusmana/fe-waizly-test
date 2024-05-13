import { useEffect } from "react"

import Breadcrumb from "./../../components/breadcrumb"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

import { useDispatch, useSelector } from "react-redux"
import { RootDispatch, RootState } from "../../config/store"
import { getBeTest7, setDefaultBeTest7 } from './../../redux/beTest7'

import { formatCurrency } from "./../../config/helper"

const BackendTest7 = () => {
  const { beTest7 } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    let {
      isSuccess,
      isLoading
    } = beTest7

    if (!isLoading && isSuccess) {
      dispatch(setDefaultBeTest7())
    }
  }, [beTest7])

  const getData = () => {
    dispatch(getBeTest7())
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
        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs">
          <span className="font-bold">Info:</span>
          <span>Show name and total sales with rank for every employees and sort by total sales, the top is the highest</span>
        </div>

        <div className="w-full h-fit rounded bg-white flex flex-col p-5 text-xs gap-5">
          <span className="font-bold">Reproduce:</span>
          <span>SELECT ROW_NUMBER() OVER () as rank_number, employees.name as name, SUM(sales.amount) as amount FROM employees JOIN sales ON employees.id = sales.employee_id GROUP BY name ORDER BY amount DESC</span>
        </div>

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