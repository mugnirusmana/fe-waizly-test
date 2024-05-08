interface Props {
  type?: string | 'submit' | 'reset'
  full?: boolean
  label?: string
  onClick?: Function
  disabled?: boolean
  customClass?: string
}

const Button = ({type, label, full, disabled, onClick, customClass}: Props) => {
  const renderStyle = () => {
    if (disabled) {
      return `cursor-not-allowed bg-gray-200 text-gray-400 border border-gray-400`
    } else {
      return `cursor-pointer ${type === 'submit' ? 'bg-gray-700 text-white border border-gray-700' : type === 'reset' ? 'bg-white text-gray-700 border border-gray-700' : ''}`
    }
  }
  return (
    <div
      className={`${full ? 'w-full' : 'w-fit'} ${renderStyle()} flex flex-row items-center justify-center text-center rounded text-xs px-4 py-2 ${customClass}`}
      onClick={() => onClick && !disabled ? onClick() : {}}
    >{label??'Button'}</div>
  )
}

export default Button