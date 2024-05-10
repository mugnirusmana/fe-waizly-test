interface Props {
  icon: any,
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ icon, disabled, onClick }: Props) => {
  return <div
    className={`w-fit text-[16px]r px-2 rounded duration-200 border ${disabled ? 'border-gray-400 bg-gray-200 cursor-not-allowed text-gray-400' : 'border-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-700 cursor-pointer'}`}
    onClick={() => onClick && !disabled ? onClick() : {}}
  >{icon}</div>
}

export default Button