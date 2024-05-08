import { useState } from "react"

import Input from "../../components/input"
import Breadcrumb from "./../../components/breadcrumb"
import Button from "../../components/button"

interface InputProps {
  value: string
  isError?: boolean
  errorMessage?: string
}

const BasicTest3 = () => {
  const [first, setFirst] = useState(true)
  const [input, setInput] = useState<InputProps>({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [formatTime, setFormatTime] = useState({
    time: '',
    result: ''
  })

  const renderResultInput = () => {
    if (formatTime?.time) {
      return (
        <div className="w-full flex flex-col text-xs mt-2">
          <div className="w-full flex flex-row gap-2">
            <span>Time Input:</span>
            <span><strong>{formatTime?.time}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Time Formatted:</span>
            <span><strong>{formatTime?.result}</strong></span>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Basic"
        subtitle="Test 3"
        data={[
          { title: 'Basic', route: '/basic-test-2', active: false },
          { title: 'Test 3', route: '', active: true }
        ]}
      />
      <div className="w-full h-full px-5">
        <div className="w-full h-full rounded bg-white p-5">
          <Input
            label="Input data"
            name={"input"}
            type={"text"}
            value={input?.value}
            isError={input?.isError}
            errorMessage={input?.errorMessage}
            placeholder="Input data"
            onChange={(e: InputProps) => {
              if (first) setFirst(false)
              setInput(e)
            }}
            validate={{
              fields: {
                required: true,
                regex: /^([0-9]|0[1-9]|1[0-2]):[0-5][0-9]:[0-5][0-9]([AP][M])$/
              },
              customMessage: {
                required: 'Input field is required',
              }
            }}
          />

          <div className="w-full flex flex-row gap-2 pb-2">
            <div className="w-full" />
            <Button
              type="reset"
              label="Reset"
              onClick={() => {
                setInput({
                  value: '',
                  isError: false,
                  errorMessage: ''
                })

                setFormatTime({
                  time: "",
                  result: ""
                })
              }}
            />

            <Button
              type="submit"
              label="Calculate"
              onClick={() => {
                let lengthTime = input?.value?.length
                let value = input?.value
                if (lengthTime === 9) value = `0${value}`
                let hour: any = value?.substring(0,2)
                let minute = value?.substring(3,5)
                let second = value?.substring(8,6)
                let format = value?.includes('PM')
                if (format) hour = parseInt(hour) + 12
                setFormatTime({
                  time: input?.value,
                  result: `${hour}:${minute}:${second}`
                })

                setInput({
                  value: '',
                  isError: false,
                  errorMessage: ""
                })
                setFirst(true)
              }}
              disabled={first || input?.isError}
            />
          </div>

          <hr />

          <div className="w-full pt-1 flex flex-col">
            <span className="font-bold text-sm">Result:</span>
            {renderResultInput()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicTest3