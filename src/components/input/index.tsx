import { IoClose } from "@react-icons/all-files/io5/IoClose"
import { FaExclamationCircle } from "@react-icons/all-files/fa/FaExclamationCircle"
import { useState } from "react"

interface Type {
  widthFit?: boolean
  label?: string
  type?: string
  name?: string
  validate?: {
    fields?: {
      required?: boolean
      min?: number
      max?: number
      regex?: any
    },
    customMessage?: {
      required?: string | null
      min?: string | null
      max?: string | null
      regex?: string | null
    }
  },
  isError?: boolean
  errorMessage?: string
  placeholder?: string
  value: string
  onChange?: Function
  icon?: any
  onClickIcon?: Function
  onClearText?: Function
  customInfo?: string
}

const Input = ({
  widthFit,
  label,
  type,
  name,
  validate,
  isError,
  errorMessage,
  placeholder,
  value,
  onChange,
  icon,
  onClickIcon,
  onClearText,
  customInfo
}: Type ) => {
  const [showInfoInput, setShowInfoInput] = useState<boolean>(false)

  const setValidate = (val: string) => {
    if (onChange) {
      let fieldName = name??'this field'
      let res = {
        name: name??null,
        isError: false,
        errorMessage: '',
        value: val
      }

      if (validate) {
        let msg = null
        if(validate?.fields?.regex) {
          if (!validate?.fields?.regex.test(val)) {
            msg = validate?.customMessage?.regex??`${fieldName} format is invalid`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.max) {
          if (val?.length > validate?.fields?.max) {
            msg = validate?.customMessage?.max??`${fieldName} maximum length ${validate?.fields?.max} character${val?.length > 1 ? 's' : ''}`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.min) {
          if (val?.length < validate?.fields?.min) {
            msg = validate?.customMessage?.min??`${fieldName} minimum length ${validate?.fields?.min} character${val?.length > 1 ? 's' : ''}`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.required) {
          if (!val || val === "" || val === '') {
            msg = validate?.customMessage?.required??`${fieldName} is required`
            res.isError = true
            res.errorMessage = msg
          }
        }
      }
      return onChange(res)
    }
    return {}
  }

  const renderClearText = () => {
    if (value && onClearText) {
      return (
        <div
          className={`w-[15px] mr-2 h-full flex flex-row items-center justify-center duration-300 ${isError ? 'text-rose-500' : 'text-gray-700'} cursor-pointer`}
          onClick={() => onClearText ? setValidate("") : {}}
        ><IoClose /></div>
      )
    }
    return null
  }

  const renderIcon = () => {
    if (icon) {
      return (
        <div
          className={`w-[15px] mr-2 h-full flex flex-row items-center justify-center duration-300 ${isError ? 'text-rose-500' : 'text-gray-700'} ${onClickIcon ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => onClickIcon ? onClickIcon() : {}}
        >{icon}</div>
      )
    }
  }

  const renderIconInfo = () => {
    if (validate?.fields?.required || validate?.fields?.min || validate?.fields?.max || validate?.fields?.regex || customInfo) {
      return (
        <div
          className={`w-[15px] mr-2 h-full flex flex-row items-center justify-center duration-300 text-xs ${isError ? 'text-rose-500' : 'text-gray-700'} cursor-pointer`}
          onClick={() => setShowInfoInput(!showInfoInput)}
        ><FaExclamationCircle /></div>
      )
    }
  }

  const renderDetailRequired = () => {
    if (validate?.fields?.required) {
      return <span className="text-[9px]">{validate?.customMessage?.required? `- ${validate?.customMessage?.required}` : `- ${name??'this field'} is required`}</span>
    }
    return null
  }

  const renderDetailMin = () => {
    if (validate?.fields?.min) {
      
      return <span className="text-[9px]">{validate?.customMessage?.max? `- ${validate?.customMessage?.max}` : `- ${name??'this field'} minimum length ${validate?.fields?.min} character${validate?.fields?.min > 1 ? 's' : ''}`}</span>
    }
    return null
  }

  const renderDetailMax = () => {
    if (validate?.fields?.max) {
      return <span className="text-[9px]">{validate?.customMessage?.max? `- ${validate?.customMessage?.max}` : `- ${name??'this field'} maximum length ${validate?.fields?.max} character${validate?.fields?.max > 1 ? 's' : ''}`}</span>
    }
    return null
  }

  const renderDetailRegex = () => {
    if (validate?.fields?.regex) {
      return <span className="text-[9px]">{`- ${name??'This field'} has custom format regex`}</span>
    }
    return null
  }

  const renderDetailCustomInfo = () => {
    if (customInfo) return <span className="text-[9px]">{`- ${customInfo}`}</span>
    return null
  }

  const renderInfo = () => {
    if (showInfoInput) {
      return (
        <div className="absolute w-[250px] top-7 right-0 bg-white text-xs border boder-gray-400 p-2 rounded flex flex-col shadow-md z-[70]">
          <span className="font-bold mb-1">The rules:</span>
          {renderDetailRequired()}
          {renderDetailMin()}
          {renderDetailMax()}
          {renderDetailRegex()}
          {renderDetailCustomInfo()}
        </div>
      )
    }
    return null
  }

  return (
    <div className={`${widthFit ? 'w-fit' : 'w-full'} flex flex-col gap-1`}>
      {label ? (
        <div className="w-fit flex flex-row gap-1 items-center">
          <span className="text-sm">{label}</span>
          {validate?.fields?.required ? <strong className="text-rose-400 text-xs">*</strong> : null}
        </div>
      ) : null}
      <div className={`w-full flex flex-row items-center rounded-md border duration-300 relative ${isError ? 'border-rose-500' : 'border-gray-700'}`}>
        <input
          type={type}
          placeholder={placeholder??'Placeholder'}
          className={`w-full px-2 py-2 text-xs outline-none bg-transparent duration-300 ${isError ? 'text-rose-500 placeholder:text-rose-500' : 'text-gray-700 placeholder:text-gray-700'}`}
          onChange={(e: any) => setValidate(e?.target?.value)}
          value={value??""}
        />
        {renderClearText()}
        {renderIconInfo()}
        {renderIcon()}
        {renderInfo()}
      </div>
      <span className={`text-rose-500 text-xs duration-300 ${isError ? 'opacity-100' : 'opacity-0'}`}>{isError ? errorMessage : '.'}</span>
    </div>
  )
}

export default Input