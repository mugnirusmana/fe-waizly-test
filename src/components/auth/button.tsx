interface Type {
  label?: string
  isLoading?: boolean
  disabled?: boolean
  onClick?: Function
}

const Button = ({
  label,
  isLoading,
  disabled,
  onClick
}: Type) => {
  const renderStyles = () => {
    if (isLoading || disabled) {
      return 'border-gray-400 bg-gray-400 text-gray-600 text-white cursor-default'
    } else {
      return 'border-white bg-transparent text-white hover:bg-white hover:text-black hover:drop-shadow-lg hover:shadow-lg cursor-pointer'
    }
  }

  const renderLabel = () => {
    if (isLoading) return 'Loading...'
    if (label) return label
    return 'Button'
  }

  return (
    <div
      className={`w-full flex flex-row items-center justify-center px-1 py-2 rounded-full duration-100 text-xs font-bold border ${renderStyles()}`}
      onClick={() => {
        if (!isLoading && !disabled && onClick) {
          return onClick()
        } else {
          return {}
        }
      }}
    >{renderLabel()}</div>
  )
}

export default Button