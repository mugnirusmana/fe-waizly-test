import { useEffect, useRef, useState } from "react"
import { FaAngleDoubleLeft } from "@react-icons/all-files/fa/FaAngleDoubleLeft"
import { FaAngleDoubleRight } from "@react-icons/all-files/fa/FaAngleDoubleRight"

import { useOutsideClick } from "./../../config/hooks"

import Select from "./select"
import Button from "./button"

interface ItemTitles {
  name?: string,
  key?: string,
  position?: string | 'left' | 'center' | 'right',
  constumRender?: (item?: any | null | undefined) => void
}

interface Props {
  titles?: Array<ItemTitles>
  withNo?: boolean
  withAction?:boolean
  withFooter?: boolean
  data?: Array<any>
  perPage?: string | number | null | undefined
  pages?: Array<any>
  currentPage: number
  totalPage: number
  totalData?: string | number | null | undefined
  renderAction?: (item?: any | null | undefined) => void | any
  onChangePerPage?: (page?: string | number | null | undefined) => void
  onNextPage?: (page?: string | number | null | undefined) => void
  onPrevPage?: (page?: string | number | null | undefined) => void
  onGoToPage?: (page?: string | number | null | undefined) => void
}

const Table = ({
  titles,
  withNo,
  withAction,
  withFooter,
  data,
  perPage,
  currentPage,
  pages,
  totalPage,
  totalData,
  renderAction,
  onChangePerPage,
  onNextPage,
  onPrevPage,
  onGoToPage,
}: Props) => {
  const refWidthParent = useRef<any>()
  const [maxWidthPerTitle, setMaxWidthPerTitle] = useState(0)
  const [showPerPage, setShowPerPage] = useState(false)
  const [showListPage, setShowListPage] = useState(false)

  const handleClickShowPerPage = () => {
    setShowPerPage(false)
  }

  const handleClickListPerPage = () => {
    setShowListPage(false)
  }

  const perpageRefs = useOutsideClick(handleClickShowPerPage)
  const listpageRefs = useOutsideClick(handleClickListPerPage)

  useEffect(() => {
    setWithTitle()
  }, [])

  const setWithTitle = () => {
    let width = refWidthParent?.current?.offsetWidth
    width = width - 50
    if (withNo) width = width - 30
    if (withAction) width = width - 100
    let titleLength: number = titles?.length ?? 0
    width = width / titleLength
    width = parseInt(width)
    setMaxWidthPerTitle(width)
  }

  const renderTitleContent = (borderStyle?: string) => {
    if (titles && titles?.length > 0) {
      return (
        <div className={`hidden w-fit laptop:flex flex-row gap-2 ${borderStyle}`}>
          {withNo ? <div className="min-w-[30px] w-[30px] font-bold py-2 px-1 flex justify-center text-center">No</div> : null}
          {renderTitle()}
          {withAction ? <div className="min-w-[100px] w-[100px] font-bold py-2 px-1 flex justify-end">Action</div> : null}
        </div>
      )
    }
    return null
  }

  const renderTitle = () => {
    return titles?.map((item: ItemTitles, index: number) => {
      let style = {
        minWidth: `${maxWidthPerTitle}px`,
        maxWidth: `${maxWidthPerTitle}px`,
        width: `${maxWidthPerTitle}px`,
      }
      return <div
        key={index}
        className={`font-bold py-2 px-1`}
        style={style}
      >{item?.name}</div>
    })
  }

  const renderDataContent = () => {
    if (data && data?.length > 0 && titles && titles?.length > 0) {
      return data?.map((item: any, index: number) => {
        return (
          <div key={index} className={`w-full laptop:w-fit flex flex-col rounded laptop:rounded-none laptop:flex-row gap-2 ${index === 0 ? 'border laptop:border-l-0 laptop:border-r-0 laptop:border-b-0 border-gray-400 laptop:border-t-0' : 'border laptop:border-l-0 laptop:border-r-0 laptop:border-b-0 border-gray-400 laptop:border-t laptop:border-t-gray-100'} hover:bg-gray-100`}>
            {withNo ? renderNumber(index + 1) : null}
            {renderData(item, index)}
            {withAction ? renderActionContent(item) : null}
          </div>
        )
      })
    }
    return <div className="w-full flex flex-row items-center justify-center text-center italic text-xs border-b border-b-gray-400 px-5 pb-5 pt-4">No data available</div>
  }

  const renderNumber = (no: number) => {
    let number: any = ((currentPage * totalPage) - totalPage) + no
    return <div className="w-full laptop:min-w-[30px] laptop:w-[30px] laptop:max-w-[30px] laptop:py-2 laptop:px-1 flex flex-row laptop:justify-center text-center">
      <div className="w-full bg-gray-400 laptop:hidden flex justify-center p-1 rounded-tl rounded-tr font-bold">No. {number}</div>
      <span className="w-fit hidden laptop:flex items-center font-bold">{number}</span>
    </div>
  }

  const renderActionContent = (item: any) => {
    return (
      <div className="w-full flex flex-col items-center bg-gray-100 laptop:bg-transparent rounded-bl rounded-br p-1 laptop:p-0">
        <div className="w-fit tablet:w-full laptop:min-w-[laptop:100px] laptop:w-[100px] laptop:max-w-[100px] py-2 px-1 flex justify-end">{setRenderAction(item)}</div>
      </div>
    )
  }

  const setRenderAction = (item: any) => renderAction ? renderAction(item) : null

  const renderData = (item_d: any, index_d: any) => {
    return titles?.map((item: ItemTitles, index: number) => {
      let { key }: any = item
      let val = item_d[key]
      let screenWidth = window.innerWidth
      let style = {}
      if (screenWidth >= 1024) {
        style = {
          minWidth: `${maxWidthPerTitle}px`,
          maxWidth: `${maxWidthPerTitle}px`,
          width: `${maxWidthPerTitle}px`,
        }
      }
      let isFirst = index === 0
      if (item?.constumRender) {
        let { constumRender }: any = item
        return <div key={`${index}-${index_d}`} className={`w-full laptop:w-fit flex flex-col ${!isFirst ? 'border-t border-t-gray-200 laptop:border-t-0' : ''} p-2 gap-2 laptop:gap-0 laptop:p-0`}>
          <span className="font-bold laptop:hidden">{item.name}</span>
          <div
            className={`laptop:py-2 laptop:px-1 w-full`}
            style={style}
          >{constumRender(item_d)}</div>
        </div>
      } else {
        return (
          <div key={`${index}-${index_d}`} className={`w-full laptop:w-fit flex flex-col ${!isFirst ? 'border-t border-t-gray-200 laptop:border-t-0' : ''} p-2 gap-2 laptop:p-0 laptop:gap-0`}>
            <span className="font-bold laptop:hidden">{item.name}</span>
            <div
              className={`laptop:py-2 laptop:px-1 w-full`}
              style={style}
            >{val??'-'}</div>
          </div>
        )
      }
    })
  }

  return (
    <div ref={refWidthParent} className="w-full h-fit rounded text-sm">
      <div className="w-full flex flex-col overflow-x-scroll hide-scroll laptop:border laptop:border-gray-400 gap-2 laptop:gap-0 rounded">
        {renderTitleContent('border-b border-b-gray-400')}
        {renderDataContent()}
        {withFooter ? renderTitleContent('border-t border-t-gray-400') : null}
      </div>
      <div className="w-full flex flex-col laptop:flex-row gap-5 py-2">
        <div className="w-full h-fit flex flex-row justify-center laptop:justify-start gap-1 whitespace-nowrap">Showing <strong>{data?.length??0}</strong> of  <strong>{totalData??0}</strong></div>
        <div className="w-full h-fit flex flex-col items-center laptop:flex-row laptop:justify-end gap-7">
          <div className="w-fit flex flex-col items-center">
            <div>Per Page</div>
            <Select
              show={showPerPage}
              ref={perpageRefs}
              onClick={(status: boolean) => setShowPerPage(status)}
              selectItem={perPage}
              onChange={(data: any) => {
                if(onChangePerPage) {
                  onChangePerPage(data)
                  setShowPerPage(false)
                }
              }}
              data={[5,10,50,100]}
            />
          </div>
          <div className="w-fit flex flex-row gap-2 items-center">
            <Button
              icon={<FaAngleDoubleLeft />}
              onClick={() => onPrevPage ? onPrevPage(currentPage - 1) : {}}
              disabled={currentPage <= 1}
            />
          </div>
          <div className="w-fit flex flex-col items-center">
            <div>Go To Page</div>
            <Select
              ref={listpageRefs}
              show={showListPage}
              withSearch={true}
              onClick={(status: boolean) => setShowListPage(status)}
              selectItem={currentPage}
              onChange={(data: any) => {
                if (onGoToPage) {
                  onGoToPage(data)
                  setShowListPage(false)
                }
              }}
              data={pages}
            />
          </div>
          <div className="w-fit flex flex-row gap-2 items-center">
            <Button
              icon={<FaAngleDoubleRight />}
              onClick={() => onNextPage ? onNextPage(currentPage + 1) : {}}
              disabled={currentPage >= totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table