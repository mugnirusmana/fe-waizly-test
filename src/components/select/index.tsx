import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown"
import { useState } from "react"

interface Props {
  value?: any
  itemKey?: string
  data?: Array<any>
  placeholder?: string
  onChange?: (item: any) => void
}

const Select = ({
  value,
  itemKey,
  data,
  placeholder,
  onChange
}: Props) => {
  const [show, setShow] = useState(false)

  const renderValue = () => {
    if (value) {
      let val = value
      if (itemKey) val = value[itemKey]
      return <span className="font-normal text-xs">{val}</span>
    }
    return <span className="font-normal text-xs text text-gray-400 whitespace-nowrap text-ellipsis">{placeholder??'Placeholder'}</span>
  }

  const renderOptions = () => {
    if (show) {
      return (
        <div
          className="absolute h-fit max-h-[200px] overflow-y-scroll hide-scroll top-9 gap-1 left-0 w-full flex flex-col rounded bg-white border border-gray-400 shadow-md p-1 text-xs"
        >
          
          {renderOption()}
        </div>
      )
    }
  }

  const renderOption = () => {
    if (data && data?.length > 0) {
      return data?.map((item: any, index: number) => {
        let val = item
        let selectItem = value
        if (itemKey) {
          val = item[itemKey]
          selectItem = value[itemKey]
        }
        return <span
          key={index}
          className={`p-2 rounded hover:bg-gray-700 hover:text-white ${val === selectItem ? 'bg-gray-700 text-white cursor-default' : 'cursor-pointer'}`}
          onClick={() => {
            if (onChange) {
              if (val !== selectItem) {
                setShow(false)
                return onChange(item)
              }
            }
          }}
        >{val}</span>
      })
    } else {
      return <span className="p-2 text-center text-[10px] italic">No data available</span>
    }
  }

  return (
    <div className="w-full h-[34px] rounded-md border border-gray-700 flex items-center px-2 relative">
      <div
        className="w-full h-full flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {renderValue()}
        <span className="font-normal text-xs"><FaCaretDown className={`duration-200 ${show ? "rotate-0" : "rotate-180"}`} /></span>
      </div>
      {renderOptions()}
    </div>
  )
}

export default Select