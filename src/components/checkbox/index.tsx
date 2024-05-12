interface Type {
  title?: string
  isChecked?: boolean
  textClass?: string
  borderClass?: string
  checkedClass?: string
  onCheck?: Function
  type?: 'circle' | 'square'
}

const Checkbox = ({title, isChecked, textClass, borderClass, checkedClass, type, onCheck}: Type) => {
  return (
    <div
      className={`w-fit h-fit ${textClass ? textClass : 'text-sm text-white'} flex flex-row gap-2 items-center cursor-pointer`}
      onClick={() => onCheck ? onCheck(!isChecked) : {}}
    >
      <div className={`w-[15px] h-[15px] border ${borderClass??'border-white'} ${type === 'circle' ? 'rounded-full' : 'rounded'} flex items-center justify-center`}>
        <div className={`w-[9px] h-[9px] ${type === 'circle' ? 'rounded-full' : 'rounded-sm'} ${checkedClass??'bg-white'} duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      <span>{title ? title : ''}</span>
    </div>
  )
}

export default Checkbox