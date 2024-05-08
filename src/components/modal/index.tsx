import { ReactNode } from "react"

interface Props {
  children?: ReactNode
  show?: boolean
}

const Modal = ({ children, show }: Props) => {
  return (
    <div className={`w-full h-full z-[900] absolute duration-300 ${show ? 'top-0' : 'top-[3000px]'} left-0 flex flex-row items-center justify-center backdrop-blur-md`}>
      <div className="w-1/2 min-h-[20px] h-fit flex flex-row bg-white rounded p-5 border border-gray-200 shadow-md">
        {children}
      </div>
    </div>
  )
}

export default Modal