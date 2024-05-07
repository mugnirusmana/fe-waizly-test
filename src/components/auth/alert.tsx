interface Type {
  show?: boolean
  title?: string
  message?: string
  onCancel?: Function
}

const Alert = ({show, title, message, onCancel}: Type) => {
  return (
    <div className={`w-full h-full absolute duration-500 ${!show ? 'top-[-2500px]' : `top-[0px]`} left-0 flex items-center justify-center backdrop-blur text-base`}>
      <div className="w-1/3 h-fit flex flex-col bg-white rounded p-10 text-black items-center gap-5">
        <span className="font-bold text-center">{title??''}</span>
        <span className="mb-10 text-xs text-center">{message??''}</span>
        <div
          className="w-full flex flex-row items-center justify-center bg-cyan-400 py-1 px-2 rounded text-white text-sm cursor-pointer text-center"
          onClick={() => onCancel ? onCancel() : {}}
        >Close</div>
      </div>
    </div>
  )
}

export default Alert