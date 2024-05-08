import { IoClose } from "@react-icons/all-files/io5/IoClose"

interface Type {
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
}

const Input = ({
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
  onClearText
}: Type ) => {

  const setValidate = (val: string) => {
    if (onChange) {
      let fieldName = name??'field'
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
    if (value) {
      return (
        <div
          className={`w-[15px] mr-2 h-full flex flex-row items-center justify-center duration-300 ${isError ? 'text-red-300' : 'text-white'} cursor-pointer`}
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
          className={`w-[15px] mr-2 h-full flex flex-row items-center justify-center duration-300 ${isError ? 'text-red-300' : 'text-white'} ${onClickIcon ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => onClickIcon ? onClickIcon() : {}}
        >{icon}</div>
      )
    }
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <div className={`w-full flex flex-row items-center rounded-full border duration-300 ${isError ? 'border-red-300' : 'border-white'}`}>
        <input
          type={type}
          placeholder={placeholder??'Placeholder'}
          className={`w-full px-2 py-2 text-xs outline-none bg-transparent duration-300 ${isError ? 'text-red-300 placeholder:text-red-300' : 'text-white placeholder:text-white'}`}
          onChange={(e: any) => setValidate(e?.target?.value)}
          value={value??""}
        />
        {renderClearText()}
        {renderIcon()}
      </div>
      <span className={`text-red-300 text-xs duration-300 ${isError ? 'opacity-100' : 'opacity-0'}`}>{isError ? errorMessage : '.'}</span>
    </div>
  )
}

export default Input