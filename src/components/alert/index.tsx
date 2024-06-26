import { FaCheckCircle } from "@react-icons/all-files/fa/FaCheckCircle"
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle"
import { IoCloseCircle } from "@react-icons/all-files/io5/IoCloseCircle"
import { FaQuestionCircle } from "@react-icons/all-files/fa/FaQuestionCircle"

import Button from "../button"

export const typeProp = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  QUESTION: 'question',
}

interface Props {
  show?: boolean
  title?: string
  message?: string
  type?: 'success' | 'warning' | 'error' | 'question' | string | null | undefined
  withConfirm?: boolean
  cancelLabel?: string
  confirmLabel?: string
  onConfirm?: Function
  onCancel?: Function
}

const Alert = ({show, title, message, type, withConfirm, cancelLabel, onCancel, confirmLabel, onConfirm}: Props) => {

  const renderType = () => {
    if (type && type === typeProp.SUCCESS) return <FaCheckCircle className="text-2xl text-lime-600" />
    if (type && type === typeProp.WARNING) return <FaExclamationCircle className="text-2xl text-amber-600" />
    if (type && type === typeProp.ERROR) return <IoCloseCircle className="text-2xl text-rose-600" />
    if (type && type === typeProp.QUESTION) return <FaQuestionCircle className="text-2xl text-cyan-600" />
    return null
  }

  return (
    <div className={`w-full h-full fixed duration-300 px-5 ${show ? 'top-0' : 'top-[3000px]'} left-0 flex items-center justify-center backdrop-blur-sm z-[1000]`}>
      <div className="w-full tablet:w-[60%] laptop:w-1/3 h-fit p-5 bg-white rounded border border-gray-200 shadow-lg flex flex-col items-center gap-2">
        {renderType()}
        <span className=" text-center font-bold">{title}</span>
        <span className="mb-10 text-xs text-center">{message}</span>
        <div className="w-full flex flex-row gap-5">
          <Button
            full={true}
            type="reset"
            label={cancelLabel??'Cancel'}
            onClick={() => onCancel ? onCancel() : {}}
          />
          {withConfirm ? (
            <Button
              full={true}
              type="submit"
              label={confirmLabel??'Cancel'}
              onClick={() => onConfirm ? onConfirm() : {}}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Alert