import { useState } from "react"
import Input from "../../components/input"
import Breadcrumb from "./../../components/breadcrumb"
import Button from "../../components/button"

interface InputProps {
  value: string
  isError?: boolean
  errorMessage?: string
}

const BasicTest2 = () => {
  const [input, setInput] = useState<InputProps>({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [calculate, setCalculate] = useState<number>(0)

  const calculateNagativeValue = () => {
    let max = -Math.abs(calculate)
    let result: any = []
    for(let first = max; first <= -1; first++) {
      result = result.concat(first)
    }
    return result
  }

  const calculatePositiveValue = () => {
    let result: any = []
    for(let first = 1; first <= calculate; first++) {
      result = result.concat(first)
    }
    return result
  }

  const renderResultInput = () => {
    if (calculate > 0) {
      const positiveValue = calculatePositiveValue()
      const nagativeValue = calculateNagativeValue()

      return (
        <div className="w-full flex flex-col text-xs mt-2">
          <div className="w-full flex flex-row gap-2">
            <span>First Value:</span>
            <span><strong>0</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Max Length:</span>
            <span><strong>{calculate}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Negative Value <strong>{calculate}</strong> from <strong>0</strong>:</span>
            <span><strong>[ {positiveValue?.join(', ')} ]</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Positive Value <strong>{calculate}</strong> from <strong>0</strong>:</span>
            <span><strong>[ {nagativeValue?.join(', ')} ]</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Result:</span>
            <span><strong>[ {nagativeValue?.join(', ')}, 0, {positiveValue?.join(', ')} ]</strong></span>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Basic"
        subtitle="Test 2"
        data={[
          { title: 'Basic', route: '/basic-test-2', active: false },
          { title: 'Test 2', route: '', active: true }
        ]}
      />
      <div className="w-full h-full px-5">
        <div className="w-full h-full rounded bg-white p-5">
          <Input
            label="Input data"
            name={"input"}
            value={input?.value}
            isError={input?.isError}
            errorMessage={input?.errorMessage}
            placeholder="Input data"
            onChange={(e: InputProps) => {
              setInput(e)
            }}
            validate={{
              fields: {
                required: true,
                max: 1,
                regex: /^[1-9]*$/
              },
              customMessage: {
                required: 'Input field is required',
                max: 'Input field maximum 1 character',
                regex: 'Input field format is invalid only 1 - 9',
              }
            }}
          />

          <div className="w-full flex flex-row gap-2 pb-2">
            <div className="w-[300%] hidden tablet:flex" />
            <Button
              full
              type="reset"
              label="Reset"
              onClick={() => {
                setInput({
                  value: '',
                  isError: false,
                  errorMessage: ''
                })
                setCalculate(0)
              }}
            />

            <Button
              full
              type="submit"
              label="Calculate"
              onClick={() => {
                setCalculate(parseInt(input?.value))

                setInput({
                  value: '',
                  isError: false,
                  errorMessage: ""
                })
              }}
              disabled={input?.isError}
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

export default BasicTest2