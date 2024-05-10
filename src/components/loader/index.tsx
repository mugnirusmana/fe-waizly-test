import { BiLoader } from "@react-icons/all-files/bi/BiLoader"
import { useEffect, useState } from "react"

interface Props {
  show?: boolean
  label?: string
}

const Loader = ({show, label}: Props) => {
  const maxHeight = window.innerHeight + 20
  const [position, setPosition] = useState(`${maxHeight}px`)

  useEffect(() => {
    setTopPosition()
  }, [])

  useEffect(() => {
    setTopPosition()
  }, [show])

  const setTopPosition = () => {
    let position = '0px'
    if (!show) position = `${maxHeight}px`
    setPosition(position)
  }

  return (
    <div
      className={`w-screen h-screen fixed duration-200 left-0 backdrop-blur-sm z-[9999] flex flex-row items-center justify-center gap-2`}
      style={{
        top: position
      }}
    >
      <span className="animate-spin"><BiLoader /></span>
      <span className="italic font-bold">{label??'Loading...'}</span>
    </div>
  )
}

export default Loader