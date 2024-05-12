export const setErrorAxios = (error: any) => {
  return {
    message: error?.data?.meta?.message??'Oops something went wrong',
    errorMeta: error?.data?.data??{}
  }
}

export const setSuccessAxios = (response: any) => {
  return response?.data?.data
}

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

interface formatCurrencyOptionType {
  locale?: string
  currency?: string
}
export const formatCurrency = (value: number, options?: formatCurrencyOptionType) => {
  return new Intl.NumberFormat(options?.locale??"id-ID", {
    style: "currency",
    currency: options?.currency??"IDR"
  }).format(value)
}