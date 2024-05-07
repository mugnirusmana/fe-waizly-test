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
  onClickIcon
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
        if(validate?.fields?.regex) {
          if (!validate?.fields?.regex.test(val)) {
            let msg = validate?.customMessage?.regex??`${fieldName} format is invalid`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.max) {
          if (val?.length > validate?.fields?.max) {
            let msg = validate?.customMessage?.max??`${fieldName} maximum length ${validate?.fields?.max} character${val?.length > 1 ? 's' :''}`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.min) {
          if (val?.length < validate?.fields?.min) {
            let msg = validate?.customMessage?.min??`${fieldName} minimum length ${validate?.fields?.min} character${val?.length > 1 ? 's' :''}`
            res.isError = true
            res.errorMessage = msg
          }
        }

        if(validate?.fields?.required) {
          if (!val || val === "" || val === '') {
            let msg = validate?.customMessage?.required??`${fieldName} is required`
            res.isError = true
            res.errorMessage = msg
          }
        }
      }
      return onChange(res)
    }
    return {}
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
        <div
          className={`w-fit pr-2 h-full flex flex-row items-center justify-center duration-300 ${isError ? 'text-red-300' : 'text-white'} ${onClickIcon ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => onClickIcon ? onClickIcon() : {}}
        >{icon}</div>
      </div>
      <span className={`text-red-300 text-xs duration-300 ${isError ? 'opacity-100' : 'opacity-0'}`}>{isError ? errorMessage : '.'}</span>
    </div>
  )
}

export default Input