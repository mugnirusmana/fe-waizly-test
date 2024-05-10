import { useEffect, useRef } from "react"

export const useOutsideClick = (callback: any) => {
  const ref: any = useRef()

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
       if (callback) callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}