import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown"
import React, { useEffect, useState } from "react"

interface Props {
  show?: boolean
  itemKey?: string
  selectItem?: any | null | undefined
  data?: Array<any>
  placeholder?: string | null | undefined
  onChange?: (item: any) => void
  onClick?: (status: boolean) => void
  withSearch?: boolean
}

const Select = React.forwardRef(({
    show,
    itemKey,
    selectItem,
    data,
    placeholder,
    onChange,
    onClick,
    withSearch,
  }: Props,
  ref: any
) => {
  const [listData, setListData] = useState<Array<any>|null|undefined>()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setListData(data)
  }, [])

  useEffect(() => {
    let list: Array<any>|null|undefined = []
    if (search && search !== "" && search !== '') {
      data?.forEach((item: any) => {
        let it: any = item?.toString()
        if (it?.includes(search)) {
          list = list?.concat(item)
        }
      })
    } else {
      list = data
    }
    setListData(list)
  }, [search])

  const renderOptionContent = () => {
    if (show) {
      return (
        <div className="absolute w-full max-h-[120px] bg-white border border-gray-400 rounded p-1 text-xs flex flex-col bottom-[20px] gap-2">
          {renderSearch()}
          <div className="w-full h-full overflow-y-scroll hide-scroll flex flex-col gap-2">
            {renderOptionItem()}
          </div>
        </div>
      )
    }
  }

  const renderSearch = () => {
    if (withSearch) {
      return <div className="w-full flex flex-row">
        <input className="outline-none px-1 w-full rounded border border-gray-400" value={search} placeholder="Search" onChange={(e) => setSearch(e?.target?.value)}/>
      </div>
    }
    return null
  }

  const renderOptionItem = () => {
    if (listData && listData?.length > 0) {
      return listData?.map((item: any, index: number) => {
        let val = item
        let style: string = 'cursor-pointer'
        let status: boolean = false
        if (selectItem === val) status = true
        if (itemKey) {
          val = item[itemKey]
          if (selectItem[itemKey] === val) status = true
        }
        if (status) style= "cursor-default bg-gray-700 text-white"
        return (
          <span
            key={index}
            className={`duration-200 px-2 hover:bg-gray-700 hover:text-white py-0.5 rounded ${style}`}
            onClick={() => onChange && !status ? onChange(item) : {}}
          >{val}</span>
        )
      })
    }

    return <span className="duration-200 px-2 py-0.5 rounded text-[8px]">No data available</span>
  }

  const renderSelectecContet = () => {
    if (selectItem) {
      let value = selectItem
      if (itemKey) {
        value = selectItem[itemKey]
      }

      return <span className="w-fit whitespace-nowrap text-[10px]">{value}</span>
    }
    return <span className="w-fit whitespace-nowrap text-[10px] text-ellipsis overflow-hidden text-gray-400">{placeholder??'select'}</span>
  }

  return (
    <div ref={ref} className="w-fit flex flex-row relative">
      <div
        className="w-[60px] rounded border border-gray-400 px-2 flex flex-row justify-between items-center text-xs cursor-pointer"
        onClick={() => onClick ? onClick(!show) : {}}
      >
        <div className="w-full flex flex-row">{renderSelectecContet()}</div>
        <span><FaCaretDown className={`text-[10px] duration-100 ${show ? 'rotate-0' : 'rotate-180'}`} /></span>
      </div>
      {renderOptionContent()}
    </div>
  )
})

export default Select