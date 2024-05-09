import { useState } from "react"
import Input from "../../components/input"
import Breadcrumb from "./../../components/breadcrumb"
import Button from "../../components/button"

interface InputProps {
  value: string
  isError?: boolean
  errorMessage?: string
}

const BasicTest1 = () => {
  const [first, setFirst] = useState(true)
  const [input, setInput] = useState<InputProps>({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [resultData, setResultData] = useState<any>([])

  const sumResultExcept = (item: any) => {
    let total = 0
    resultData?.forEach((item_r: any) => item_r !== item ? total += item_r : {})
    return total
  }

  const renderResultInput = () => {
    if (resultData?.length > 0) {
      let resultString = '[ '+resultData?.join(', ')+' ]'
      let total = resultData.reduce((first: number, next: number) => first + next, 0)
      let minVal = Math.min(...resultData)
      let maxVal = Math.max(...resultData)
      let resultMin = total - maxVal
      let resultMax = total - minVal

      return (
        <div className="w-full flex flex-col text-xs mt-2">
          <div className="w-full flex flex-row gap-2">
            <span>Input:</span>
            <span><strong>{resultString}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Min Value:</span>
            <span><strong>{minVal}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Max Value:</span>
            <span><strong>{maxVal}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2">
            <span>Total:</span>
            <span><strong>{total}</strong></span>
          </div>
          <div className="w-full flex flex-row gap-2 my-2">
            <span>Result Total Min & Max:</span>
            <span><strong>{resultMin}</strong> & <strong>{resultMax}</strong></span>
          </div>
          {resultData?.map((item: any, index: number) => {
            return (
              <div key={index} className="w-full flex flex-row gap-2">
                <span>Sum <strong>{resultString}</strong> Except <strong>{item}</strong> = <strong>{sumResultExcept(item)}</strong></span>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Basic"
        subtitle="Test 1"
        data={[
          { title: 'Basic', route: '/basic-test-1', active: false },
          { title: 'Test 1', route: '', active: true }
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
              if (first) setFirst(false)
              setInput(e)
            }}
            validate={{
              fields: {
                required: true,
                regex: /^[0-9 ]*$/
              },
              customMessage: {
                required: 'Input field is required',
                regex: 'Input field format is invalid only numeric and space',
              }
            }}
            customInfo={"input number, uses spaces as separators"}
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
                setResultData([])
              }}
            />

            <Button
              full
              type="submit"
              label="Calculate"
              onClick={() => {
                let data: any = input.value?.split(' ')?.filter((item) => item || item !== '' ? true : false).map((item: any) => {
                  item = parseInt(item)
                  return item
                })
                setResultData(data)

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

export default BasicTest1