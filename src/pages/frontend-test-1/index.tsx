import React, { useEffect, useState } from "react"
import DraggableList from "react-draggable-list"
import { FaPlus } from "@react-icons/all-files/fa/FaPlus"

import Breadcrumb from "../../components/breadcrumb"
import DragableItem from "../../components/template-dragable-list"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../config/root-reducer"
import { getTodo, setDefaultTodo } from "../../redux/listTodoSlice"
import { getComplete, setDefaultComplete } from "../../redux/listCompleteSlice"
import { setSort, setDefaultSortTask } from "../../redux/sortTaskSlice"
import { setCreate, setDefaultCreateTask } from "../../redux/createTaskSlice"

import Input from "../../components/input"
import Modal from "../../components/modal"
import Button from "../../components/button"

const FrontendTest1 = () => {
  const dispatch = useDispatch<any>()
  const { listTodo, listComplete, createTask, sortTask } = useSelector((state: RootState) => state)
  const _container = React.createRef<HTMLDivElement>()

  const [showModalAdd, setShowModalAdd] = useState(false)
  const [keywordTodo, setKeywordTodo] = useState({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [dataTodo, setDataTodo] = useState<any>([])
  const [keywordComplete, setKeywordComplete] = useState({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [dataComplete, setDataComplete] = useState<any>([])
  const [newName, setNewName] = useState({
    value: '',
    isError: false,
    errorMessage: ''
  })
  const [newDesc, setNewDesc] = useState({
    value: '',
    isError: false,
    errorMessage: ''
  })

  useEffect(() => {
    dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
    dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
  }, [])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [keywordTodo])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [keywordComplete])

  useEffect(() => {
    let {
      data,
      isLoading,
      isSuccess,
      // isError,
      // errorMessage,
      // errorMeta
    } = listTodo
    
    if (!isLoading && isSuccess) {
      setDataTodo(data)
      dispatch(setDefaultTodo())
    }
  }, [listTodo])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMeta
    } = createTask

    if (!isLoading && isSuccess) {
      dispatch(setDefaultCreateTask())
      setShowModalAdd(false)
      resetModalAdd()
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
    }

    if (!isLoading && isError) {
      setNewName({
				...newName,
				isError: errorMeta?.error?.name? true : false,
				errorMessage: errorMeta?.error?.name??''
			})
			setNewDesc({
				...newDesc,
				isError: errorMeta?.error?.description? true : false,
				errorMessage: errorMeta?.error?.description??''
			})
      dispatch(setDefaultCreateTask())
    }
  }, [createTask])

  useEffect(() => {
    let {
      data,
      isLoading,
      isSuccess,
      // isError,
      // errorMessage,
      // errorMeta
    } = listComplete
    
    if (!isLoading && isSuccess) {
      setDataComplete(data)
      dispatch(setDefaultComplete())
    }
  }, [listComplete])
  
  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      // isError,
      // errorMessage,
      // errorMeta
    } = sortTask
    
    if (!isLoading && isSuccess) {
      dispatch(setDefaultSortTask())
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
    }
  }, [sortTask])

  const resetModalAdd = () => {
    setNewName({
      value: '',
      isError: false,
      errorMessage: ''
    })
    setNewDesc({
      value: '',
      isError: false,
      errorMessage: ''
    })
  }

  const setNewListTodo = (newListTodo: any) => {
    setDataTodo(newListTodo)
    let newList: any = []
    let length: any = newListTodo?.length
    newListTodo?.forEach((item: any) => {
      newList = newList.concat({
        id: item?.id,
        sort_number: length
      })
      length = length-1
    })
    dispatch(setSort(newList))
  }

  const setNewListComplete = (newListComplete: any) => {
    setDataComplete(newListComplete)
    let newList: any = []
    let length: any = newListComplete?.length
    newListComplete?.forEach((item: any) => {
      newList = newList.concat({
        id: item?.id,
        sort_number: length
      })
      length = length-1
    })
    dispatch(setSort(newList))
  }

  const renderLoader = (isLoading: boolean = false) => {
    if (isLoading) return <div className="w-full h-full backdrop-blur-md flex items-center justify-center absolute top-0 left-0 z-[100]">Loading...</div>
    return null
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Frontend"
        subtitle="Test 1"
        data={[
          { title: 'Test 1', route: '', active: true }
        ]}
      />
      <div className="w-full h-full">
        <div className="w-full h-full flex flex-row gap-5 px-5">
          <div className="w-full h-full flex flex-col bg-white rounded p-5 relative">
            {renderLoader(listTodo?.isLoading || sortTask?.isLoading)}
            <div className="w-full flex flex-row justify-between items-center">
              <span className="font-bold text-2xl">List Task Todo</span>
              <div
                className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-cyan-700 hover:border-cyan-700 cursor-pointer"
                onClick={() => setShowModalAdd(true)}
              >
                <FaPlus className="text-xs" />
              </div>
            </div>

            <div className="pt-5">
              <Input value={keywordTodo?.value} onChange={(e: any) => setKeywordTodo(e)} onClearText={(e: any) => setKeywordTodo(e)} placeholder="Find todo task" />
            </div>

            <div className="w-full h-full flex flex-col pb-10">
              <div
                className="list"
                ref={_container}
                style={{
                  padding: '0',
                  marginBottom: '0',
                  marginTop: '20px',
                  marginLeft: '0',
                  marginRight: '0',
                  borderRadius: '10px',
                  width: '100%'
                }}
              >
                <DraggableList
                  itemKey={"name"}
                  list={dataTodo}
                  template={DragableItem}
                  onMoveEnd={(newListTodo: any) => setNewListTodo(newListTodo)}
                  container={() => _container.current!}
                />
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-col bg-white rounded p-5 relative">
            {renderLoader(listComplete?.isLoading || sortTask?.isLoading)}
            <span className="font-bold text-2xl">List Task Complete</span>

            <div className="pt-5">
              <Input value={keywordComplete?.value} onChange={(e: any) => setKeywordComplete(e)} onClearText={(e: any) => setKeywordComplete(e)} placeholder="Find complete task" />
            </div>

            <div className="w-full h-full flex flex-col pb-10">
              <div
                className="list"
                ref={_container}
                style={{
                  padding: '0',
                  marginBottom: '0',
                  marginTop: '20px',
                  marginLeft: '0',
                  marginRight: '0',
                  borderRadius: '10px',
                  width: '100%'
                }}
              >
                <DraggableList
                  itemKey={"name"}
                  list={dataComplete}
                  template={DragableItem}
                  onMoveEnd={(newListComplete: any) => setNewListComplete(newListComplete)}
                  container={() => _container.current!}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModalAdd}>
        <div className="w-full h-full flex flex-col gap-5 relative">
          <span className="w-full flex items-center justify-center text-center font-bold">Add New Task</span>
          <Button
            label="X"
            type="reset"
            customClass={'absolute top-0 right-0 rounded-full text-xs'}
            onClick={() => {
              resetModalAdd()
              setShowModalAdd(false)
            }}
          />
          <Input
            label="Name"
            value={newName?.value}
            onChange={(e: any) => setNewName(e)}
            isError={newName?.isError}
            errorMessage={newName?.errorMessage}
            placeholder="Name"
            validate={{
              fields: {
                required: true,
                min: 5,
                max: 20
              },
            }}
          />

          <Input
            label="Description"
            value={newDesc?.value}
            onChange={(e: any) => setNewDesc(e)}
            isError={newDesc?.isError}
            errorMessage={newDesc?.errorMessage}
            placeholder="Description"
            validate={{
              fields: {
                required: true,
                min: 5,
                max: 255
              },
            }}
          />

          <div className="w-full flex flex-row gap-5">
            <Button
              full
              disabled={createTask?.isLoading}
              label={createTask?.isLoading ? "Loading..." : "Reset"}
              type="reset"
              onClick={() => resetModalAdd()}
            />

            <Button
              full
              disabled={createTask?.isLoading || newName?.isError || newDesc?.isError}
              label={createTask?.isLoading ? "Loading..." : "Submit"}
              type="submit"
              onClick={() => {
                let params = {
                  name: newName?.value,
                  description: newDesc?.value,
                }
                dispatch(setCreate(params))
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FrontendTest1