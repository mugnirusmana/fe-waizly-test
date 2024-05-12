interface ItemsData {
  title?: string
  active?: boolean
  route?: string
}

interface Props {
  title?: string
  subtitle?: string
  data?: ItemsData[]
}

const Breadcrumb = ({title, subtitle, data}: Props) => {
  const renderListbreadcrum = () => {
    return data?.map((item: any, index: number) => {
      if (index === 0) {
        return <span key={index} className={item?.active ? "cursor-default" : "duration-200 text-gray-300 cursor-pointer hover:text-gray-700"}>{item?.title}</span>
      } else {
        return (
          <div key={index} className="flex flex-row gap-1">
            <span className="text-gray-300">/</span>
            <span className={item?.active ? "cursor-default" : "duration-200 text-gray-300 cursor-pointer hover:text-gray-700"}>{item?.title}</span>
          </div>
        )
      }
    })
  }

  return (
    <div className="w-full min-h-[60px] bg-white flex flex-row items-center justify-between px-5">
      <div className="w-fit flex flex-col">
        <span className="font-bold">{title??'Title'}</span>
        <span className="text-sm">{subtitle??''}</span>
      </div>
      <div className="w-fit flex flex-col laptop:flex-row text-xs gap-1">
        {renderListbreadcrum()}
      </div>
    </div>
  )
}

export default Breadcrumb