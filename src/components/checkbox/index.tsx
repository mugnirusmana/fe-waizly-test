interface Type {
  title?: string
  isChecked?: boolean
  textClass?: string
  borderClass?: string
  checkedClass?: string
  onCheck?: Function
}

const Checkbox = ({title, isChecked, textClass, borderClass, checkedClass, onCheck}: Type) => {
  return (
    <div
      className={`w-fit h-fit ${textClass ? textClass : 'text-sm text-white'} flex flex-row gap-2 items-center cursor-pointer`}
      onClick={() => onCheck ? onCheck(!isChecked) : {}}
    >
      <div className="w-[15px] h-[15px] border border-white rounded flex items-center justify-center">
        <div className={`w-[9px] h-[9px] rounded-sm bg-white duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <span>{title ? title : ''}</span>
    </div>
  )
}

export default Checkbox