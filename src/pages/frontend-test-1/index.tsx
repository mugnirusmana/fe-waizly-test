import { useEffect, useState } from "react"
import moment from "moment"
import { FaPlus } from "@react-icons/all-files/fa/FaPlus"
import { FaEye } from "@react-icons/all-files/fa/FaEye"
import { FaPen } from "@react-icons/all-files/fa/FaPen"
import { FaTrash } from "@react-icons/all-files/fa/FaTrash"
import { FaCaretLeft } from "@react-icons/all-files/fa/FaCaretLeft"
import { FaCaretRight } from "@react-icons/all-files/fa/FaCaretRight"

import Breadcrumb from "../../components/breadcrumb"

import { useDispatch, useSelector } from "react-redux"
import { RootState, RootDispatch } from "../../config/store"
import { getTodo, setDefaultTodo } from "../../redux/listTodoSlice"
import { getComplete, setDefaultComplete } from "../../redux/listCompleteSlice"
import { setDefaultSortTask } from "../../redux/sortTaskSlice"
import { setCreate, setDefaultCreateTask } from "../../redux/createTaskSlice"
import { setDelete, setDefaultDeleteTask } from "../../redux/deleteTaskSlice"
import { setComplete, setDefaultCompleteTask } from "../../redux/completeTaslSlice"
import { setTodo, setDefaultTodoTask } from "../../redux/todoTaskSlice"
import { setEdit, setDefaultEditTask } from "../../redux/editTaskSlice"

import Input from "../../components/input"
import Modal from "../../components/modal"
import Button from "../../components/button"
import Alert from "../../components/alert"

const FrontendTest1 = () => {
  const dispatch = useDispatch<RootDispatch>()
  const {
    auth,
    listTodo,
    listComplete,
    createTask,
    sortTask,
    deleteTask,
    todoTask,
    completeTask,
    editTask
  } = useSelector((state: RootState) => state)
  const [showModalEdit, setShowModalEdit] = useState(false)
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
  const [modalDetail, setModalDetail] = useState<any>({
    show: false,
    data: {}
  })
  const [editId, setEditId] = useState('')
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
  const [globalAlert, setGlobalAlert] = useState({
    show: false,
    title: '',
    message: '',
    type: ''
  })
  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
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
      isError,
      errorMessage,
    } = listTodo
    
    if (!isLoading && isSuccess) {
      setDataTodo(data)
      dispatch(setDefaultTodo())
    }

    if (!isLoading && isError) {
      dispatch(setDefaultTodo())
      setGlobalAlert({
        show: true,
        title: 'Get List Todo',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [listTodo])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      errorMeta
    } = createTask

    if (!isLoading && isSuccess) {
      dispatch(setDefaultCreateTask())
      setShowModalAdd(false)
      resetModalAdd()
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      setGlobalAlert({
        show: true,
        title: 'Create',
        message: 'Data successfully created',
        type: 'success'
      })
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
      setGlobalAlert({
        show: true,
        title: 'Create',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [createTask])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      errorMeta
    } = editTask

    if (!isLoading && isSuccess) {
      dispatch(setDefaultEditTask())
      setShowModalEdit(false)
      resetModalAdd()
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
      setGlobalAlert({
        title: 'Edit',
        message: 'Data successfully updated',
        type: 'success',
        show: true
      })
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
      dispatch(setDefaultEditTask())
      setGlobalAlert({
        show: true,
        title: 'Edit',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [editTask])

  useEffect(() => {
    let {
      data,
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = listComplete
    
    if (!isLoading && isSuccess) {
      setDataComplete(data)
      dispatch(setDefaultComplete())
    }

    if (!isLoading && isError) {
      dispatch(setDefaultComplete())
      setGlobalAlert({
        show: true,
        title: 'Get List Complete',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [listComplete])
  
  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = sortTask
    
    if (!isLoading && isSuccess) {
      dispatch(setDefaultSortTask())
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
    }

    if (!isLoading && isError) {
      dispatch(setDefaultSortTask())
      setGlobalAlert({
        show: true,
        title: 'Get List Complete',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [sortTask])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = deleteTask
    
    if (!isLoading && isSuccess) {
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultDeleteTask())
      setGlobalAlert({
        show: true,
        title: 'Delete',
        message: 'Data successfully deleted',
        type: 'success'
      })
    }

    if (!isLoading && isError) {
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultDeleteTask())
      setGlobalAlert({
        show: true,
        title: 'Delete',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [deleteTask])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = todoTask
    
    if (!isLoading && isSuccess) {
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultTodoTask())
      setGlobalAlert({
        show: true,
        title: 'Todo',
        message: 'Data successfully updated',
        type: 'success'
      })
    }

    if (!isLoading && isError) {
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultTodoTask())
      setGlobalAlert({
        show: true,
        title: 'Todo',
        message: errorMessage??'Someting went wrong',
        type: 'error'
      })
    }
  }, [todoTask])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = completeTask
    
    if (!isLoading && isSuccess) {
      dispatch(getTodo({status: '1', keyword: keywordTodo?.value}))
      dispatch(getComplete({status: '2', keyword: keywordComplete?.value}))
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultCompleteTask())
      setGlobalAlert({
        show: true,
        title: 'Complete',
        message: 'Data successfully updated',
        type: 'success'
      })
    }

    if (!isLoading && isError) {
      setConfirmAlert({
        show: false,
        message: '',
        title: '',
        onCancel: () => {},
        onConfirm: () => {}
      })
      dispatch(setDefaultCompleteTask())
      setGlobalAlert({
        show: true,
        title: 'Complete',
        message: errorMessage??'Someting went wrong',
        type: "error"
      })
    }
  }, [completeTask])

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

  const renderLoader = (isLoading: boolean = false) => {
    if (isLoading) return <div className="w-full h-full backdrop-blur-md flex items-center justify-center absolute top-0 left-0 z-[100]">Loading...</div>
    return null
  }

  const renderDataTask = (data: any, type?: string, isLoading?: boolean) => {
    if (!isLoading) {
      if (data?.length > 0) {
        return data?.map((item: any, index: number) => {
          return (
            <div key={index} className="w-full h-fit flex flex-row justify-between border border-gray-200 rounded p-2 shadow-md">
              <div className="w-fit flex flex-col">
                <span className="font-bold text-sm whitespace-nowrap">{item?.name}</span>
                <span className="text-[8px] whitespace-nowrap">created by: {auth?.data?.name}</span>
              </div>
              <div className="w-fit flex flex-row gap-1">
                <div
                  className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-teal-700 hover:border-bg-teal-700 cursor-pointer"
                  onClick={() => setModalDetail({
                    show: true,
                    data: item
                  })}
                >
                  <FaEye className="text-xs" />
                </div>
                <div
                  className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-lime-700 hover:border-bg-lime-700 cursor-pointer"
                  onClick={() => {
                    setEditId(item?.id)
                    setNewName({
                      ...newName,
                      value: item?.name
                    })
                    setNewDesc({
                      ...newDesc,
                      value: item?.desc
                    })
                    setShowModalEdit(true)
                  }}
                >
                  <FaPen className="text-xs" />
                </div>
                {type === 'todo' ? (
                  <div
                    className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-emerald-700 hover:border-bg-emerald-700 cursor-pointer"
                    onClick={() => {
                      setConfirmAlert({
                        show: true,
                        title: 'Todo',
                        message: `Will set ${item?.name} back to todo?`,
                        onCancel: () => {
                          setConfirmAlert({
                            ...confirmAlert,
                            show: false,
                          })
                        },
                        onConfirm: () => {
                          dispatch(setTodo(item?.id))
                          setConfirmAlert({
                            ...confirmAlert,
                            show: false,
                          })
                        }
                      })
                    }}
                  >
                    <FaCaretLeft className="text-xs" />
                  </div>
                ) : null}
                {type === 'complete' ? (
                  <div
                    className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-emerald-700 hover:border-bg-emerald-700 cursor-pointer"
                    onClick={() => {
                      setConfirmAlert({
                        show: true,
                        title: 'Complete',
                        message: `Will set ${item?.name} as to complete task?`,
                        onCancel: () => {
                          setConfirmAlert({
                            ...confirmAlert,
                            show: false,
                          })
                        },
                        onConfirm: () => {
                          dispatch(setComplete(item?.id))
                          setConfirmAlert({
                            ...confirmAlert,
                            show: false,
                          })
                        }
                      })
                    }}
                  >
                    <FaCaretRight className="text-xs" />
                  </div>
                ) : null}
                <div
                  className="w-fit h-fit p-1 rounded duration-200 border bg-white border-gray-400 text-gray-400 hover:text-white hover:bg-rose-700 hover:border-rose-700 cursor-pointer"
                  onClick={() => {
                    setConfirmAlert({
                      show: true,
                      title: 'Delete item',
                      message: `Will you delete ${item?.name}?`,
                      onCancel: () => {
                        setConfirmAlert({
                          ...confirmAlert,
                          show: false,
                        })
                      },
                      onConfirm: () => {
                        dispatch(setDelete(item?.id))
                        setConfirmAlert({
                          ...confirmAlert,
                          show: false,
                        })
                      }
                    })
                  }}
                >
                  <FaTrash className="text-xs" />
                </div>
                
              </div>
            </div>
          )
        })
      } else {
        return <div className="w-full flex justify-start items-start text-[9px] italic">No data available</div>
      }
    }
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
        <div className="w-full h-fit flex flex-col laptop:flex-row gap-5 px-5">
          <div className="w-full h-full flex flex-col bg-white rounded p-5 relative">
            {renderLoader(listTodo?.isLoading || sortTask?.isLoading || deleteTask?.isLoading)}
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

            <div className="w-full h-full flex flex-col gap-2 pb-10">
              {renderDataTask(dataTodo, 'complete')}
            </div>
          </div>

          <div className="w-full h-full flex flex-col bg-white rounded p-5 relative">
            {renderLoader(listComplete?.isLoading || sortTask?.isLoading || deleteTask?.isLoading)}
            <span className="font-bold text-2xl">List Task Complete</span>

            <div className="pt-5">
              <Input value={keywordComplete?.value} onChange={(e: any) => setKeywordComplete(e)} onClearText={(e: any) => setKeywordComplete(e)} placeholder="Find complete task" />
            </div>

            <div className="w-full h-full flex flex-col gap-2 pb-10">
              {renderDataTask(dataComplete, 'todo')}
            </div>
          </div>
        </div>
      </div>

      <Alert
        show={confirmAlert?.show}
        title={confirmAlert?.title}
        message={confirmAlert?.message}
        type={'question'}
        cancelLabel="No"
        confirmLabel="Yes"
        withConfirm
        onCancel={confirmAlert?.onCancel}
        onConfirm={confirmAlert?.onConfirm}
      />

      <Alert
        show={globalAlert?.show}
        title={globalAlert?.title}
        message={globalAlert?.message}
        type={globalAlert?.type}
        onCancel={() => {
          setGlobalAlert({
            ...globalAlert,
            show: false,
          })
        }}
      />

      <Modal show={modalDetail?.show}>
        <div className="w-full flex flex-col text-sm">
          <div className="w-full h-full flex flex-col gap-5 relative">
            <span className="w-full flex items-center justify-center text-center font-bold">Detail</span>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">Name</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{modalDetail?.data?.name}</span>
              </div>
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">Create By</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{auth?.data?.name}</span>
              </div>
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">Status</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{modalDetail?.data?.status === '1' ? 'Todo' : 'Complete'}</span>
              </div>
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">Description</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{modalDetail?.data?.desc}</span>
              </div>
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">Create Date</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{moment(modalDetail?.data?.created_at)?.format('YYYY-MM-DD')}</span>
              </div>
              <div className="w-full flex flex-row gap-2">
                <div className="w-fit flex flex-row gap-2">
                  <span className="w-[120px]">latest Update</span>
                  <span className="w-fit">:</span>
                </div>
                <span>{moment(modalDetail?.data?.updated_at)?.format('YYYY-MM-DD')}</span>
              </div>
            </div>
            <Button
              full
              label={"Close"}
              type="reset"
              onClick={() => setModalDetail({...modalDetail, show: false})}
            />
          </div>
        </div>
      </Modal>

      <Modal show={showModalAdd}>
        <div className="w-full h-full flex flex-col gap-5 relative">
          <span className="w-full flex items-center justify-center text-center font-bold">Add New Task</span>
          <Button
            label="X"
            type="reset"
            customClass={'absolute top-0 right-0 rounded-full w-[20px] h-[33px] p-[0px] text-xs'}
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

      <Modal show={showModalEdit}>
        <div className="w-full h-full flex flex-col gap-5 relative">
          <span className="w-full flex items-center justify-center text-center font-bold">Edit Task</span>
          <Button
            label="X"
            type="reset"
            customClass={'absolute top-0 right-0 rounded-full w-[20px] h-[33px] p-[0px] text-xs'}
            onClick={() => {
              setEditId('')
              resetModalAdd()
              setShowModalEdit(false)
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
                min: 5,
                max: 255
              },
            }}
          />

          <div className="w-full flex flex-row gap-5">
            <Button
              full
              disabled={editTask?.isLoading}
              label={editTask?.isLoading ? "Loading..." : "Reset"}
              type="reset"
              onClick={() => {
                resetModalAdd()
              }}
            />

            <Button
              full
              disabled={editTask?.isLoading || newName?.isError || newDesc?.isError}
              label={editTask?.isLoading ? "Loading..." : "Submit"}
              type="submit"
              onClick={() => {
                let params = {
                  name: newName?.value,
                  description: newDesc?.value,
                  '_method': 'put'
                }
                dispatch(setEdit(params, editId))
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default FrontendTest1