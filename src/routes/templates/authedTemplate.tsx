import { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie"
import { FaCaretRight } from "@react-icons/all-files/fa/FaCaretRight"
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase"
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight"
import { FaFile } from "@react-icons/all-files/fa/FaFile"

import { useDispatch, useSelector } from "react-redux"
import { RootState, RootDispatch } from "../../config/store"
import { logOut } from "./../../redux/authSlice"

import { useOutsideClick } from "./../../config/hooks"

interface Props {
  children: ReactNode
}

const Dashboard = ({ children }: Props) => {
  const navigate = useNavigate()
  const { auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<RootDispatch>()

  const [showMenu, setShowMenu] = useState(false)
  const [showSetting, setShowSetting] = useState(false)
  const [menu, setMenu] = useState([
    {
      title: 'Dashboard',
      icon: <FaChartPie />,
      route: '/dashboard',
      active: false,
    },
    {
      title: 'Basic',
      icon: <FaFile />,
      active: false,
      showChildrens: false,
      childrens: [
        {
          title: 'Test 1',
          route: '/basic-test-1',
          active: false,
        },
        {
          title: 'Test 2',
          route: '/basic-test-2',
          active: false,
        },
        {
          title: 'Test 3',
          route: '/basic-test-3',
          active: false,
        }
      ]
    },
    {
      title: 'Backend 2',
      icon: <FaFile />,
      active: false,
      showChildrens: false,
      childrens: [
        {
          title: 'Test 1',
          route: '/backend-test-1',
          active: false,
        },
        {
          title: 'Test 2',
          route: '/backend-test-2',
          active: false,
        },
        {
          title: 'Test 3',
          route: '/backend-test-3',
          active: false,
        },
        {
          title: 'Test 4',
          route: '/backend-test-4',
          active: false,
        },
        {
          title: 'Test 5',
          route: '/backend-test-5',
          active: false,
        },
        {
          title: 'Test 6',
          route: '/backend-test-6',
          active: false,
        },
        {
          title: 'Test 7',
          route: '/backend-test-7',
          active: false,
        },
        {
          title: 'Test 8',
          route: '/backend-test-8',
          active: false,
        }
      ]
    },
    {
      title: 'Frontend 1',
      icon: <FaDatabase />,
      route: '/frontend-test-1',
      active: false,
    }
  ])

  const handleClickHideMenu = () => {
    setShowMenu(false)
  }

  const handleClickHideSetting = () => {
    setShowSetting(false)
  }

  const menuRefs = useOutsideClick(handleClickHideMenu)
  const settingRefs = useOutsideClick(handleClickHideSetting)

  useEffect(() => {
    let url: any = window.location.pathname
    setActiveMenu(url)
  }, [])

  const setActiveMenu = (target: any = null) => {
    let listMenu: any = menu?.map((item: any) => {
      if (item?.childrens && item?.childrens?.length > 0) {
        let childrenMenu = null
        item?.childrens?.map((item_c: any) => {
          if (target?.includes(item_c?.route)) {
            item_c.active = true
            childrenMenu = item_c?.route
          } else {
            item_c.active = false
          }
          return item_c
        })
        if (childrenMenu) {
          item.active = true
          item.showChildrens = true
        } else {
          item.active = false
          item.showChildrens = false
        }
      } else {
        if (target?.includes(item?.route)) {
          item.active = true
        } else {
          item.active = false
        }
      }
      return item
    })

    setMenu(listMenu)
  }

  const setShowChildren = (status: boolean, title: string) => {
    let listMenu: any = menu?.map((item: any) => {
      if (item?.childrens && item?.childrens?.length > 0) {
        if (title === item?.title) {
          item.showChildrens = status
        }
      }

      return item;
    })

    setMenu(listMenu)
  }

  const renderMenu = () => {
    return menu?.map((item: any, index: number) => {
      if (item?.childrens && item?.childrens?.length > 0) {
        return renderTreeMenu(item, index)
      } else {
        return renderSingleMenu(item, index)
      }
    })
  }

  const renderChildrenMenu = (item: any) => {
    if (item?.showChildrens) {
      return item?.childrens?.map((item_c: any, index_c: number) => {
        return (
          <div
            key={index_c}
            className={`flex flex-row gap-2 items-center cursor-pointer duration-300 hover:text-orange-400 ${item_c?.active ? 'text-orange-400' : ''}`}
            onClick={() => {
              if (item_c?.route) {
                setShowMenu(false)
                setActiveMenu(item_c?.route)
                navigate(item_c?.route)
              }
            }}
          >
            <FaAngleRight />
            <div className="w-fit">{item_c?.title}</div>
          </div>
        )
      })
    }
  }

  const renderTreeMenu = (item: any, index: number) => {
    return (
      <div key={index} className="px-5 flex flex-col">
        <div
          className={`flex flex-row justify-between mb-1 items-center cursor-pointer hover:text-orange-400 duration-300 ${item?.active ? 'text-orange-400' : ''}`}
          onClick={() => {
            setShowChildren(!item?.showChildrens, item?.title)
          }}
        >
          <div className={"flex flex-row gap-2 items-center"}>
            {item?.icon}
            <div className="w-fit">{item?.title}</div>
          </div>
          <div className="w-fit"><FaCaretRight className={`duration-200 ${item?.showChildrens ? 'rotate-90' : 'rotate-0'}`} /></div>
        </div>
        <div className="w-full flex flex-col pl-5 gap-1 font-normal">
          {renderChildrenMenu(item)}
        </div>
      </div>
    )
  }

  const renderSingleMenu = (item: any, index: number) => {
    return (
      <span
        key={index}
        className={`w-fit cursor-pointer px-5 flex flex-row gap-2 items-center duration-300 hover:text-orange-400 ${item?.active ? 'text-orange-400' : ''}`}
        onClick={() => {
          if (item?.route) {
            setShowMenu(false)
            setActiveMenu(item?.route)
            navigate(item?.route)
          }
        }}
      >
        {item?.icon}
        <span>{item?.title}</span>
      </span>
    )
  }

  return (
    <div className="flex flex-row w-screen h-screen bg-gray-200 overflow-y-scroll hide-scroll text-gray-700">
      <div className="flex w-fit relative" ref={menuRefs}>
        <div
          className={`fixed w-[45px] h-[60px] top-0 cursor-pointer duration-300 ${showMenu ? 'left-[250px]' : 'left-[0px]'} z-[500] flex items-center`}
          onClick={() => setShowMenu(!showMenu)}
        >
          <div className="w-full h-[60px] flex items-center bg-gray-700 py-3 rounded-tr-md rounded-br-md relative" >
            <div className={`w-[30px] h-[6px] rounded bg-white duration-300 absolute left-[7px] ${showMenu ? 'top-[27px] rotate-45' : 'top-5 rotate-0'}`}></div>
            <div className={`w-[30px] h-[6px] rounded bg-white duration-300 absolute left-[7px] ${showMenu ? 'bottom-[27px] -rotate-45' : 'bottom-5 rotate-0'}`}></div>
          </div>
        </div>
        <div className={`w-[250px] h-full bg-gray-700 text-white flex flex-col text-base overflow-y-scroll hide-scroll fixed duration-300 ${showMenu ? 'left-[0]' : 'left-[-250px]'} top-0 z-[500]`}>
          <div className="w-full flex flex-col gap-5 relative">
            <span className="w-full flex items-center justify-center text-2xl text-center p-5">Waizly<strong>Test</strong></span>

            <div className="w-full flex flex-col items-center justify-center gap-2 px-5">
              <img
                src="https://cdn.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.webp"
                alt="profile"
                className="w-[60px] h-[60px] object-cover rounded-full border-2 border-gray-200"
              />
              <span className="text-sm text-center">{auth?.data?.name}</span>
            </div>

            <div className="w-full h-full flex flex-col gap-4 text-base text-gray-500 font-bold">
              <span className="text-gray-600 text-xs border-b-2 border-b-gray-600"></span>
              {renderMenu()}
              <span className="w-full min-h-[10px]"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex flex-col">
        <div className="w-full min-h-[60px] bg-[#ffbc79] fixed top-0 flex flex-row pr-5 items-center justify-end text-xs z-[30]">
          <div ref={settingRefs} className="w-fit h-fit relative">
            <img
              src="https://cdn.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.webp"
              alt="profile"
              className="w-[30px] h-[30px] object-cover rounded-full border-2 border-gray-700 cursor-pointer"
              onClick={() => setShowSetting(!showSetting)}
            />
            <div className={`w-[80px] h-fit bg-white border border-gray-200 duration-300 absolute top-8 shadow-lg ${showSetting ? 'right-0' : '-right-28'} rounded flex flex-col gap-2 p-2`}>
              <span
                className="cursor-pointer hover:underline"
                onClick={() => {
                  setShowSetting(false)
                }}
              >Profile</span>
              <span
                className={`${auth?.isLoading ? 'cursor-default' : 'cursor-pointer'} hover:underline`}
                onClick={() => !auth?.isLoading ? dispatch(logOut()) : {}}
              >{auth?.isLoading ? 'Loading...' : 'Logout'}</span>
            </div>
          </div>
        </div>
        {children}
        <div className="w-full min-h-[40px] bg-gray-300 mt-5 flex flex-row items-center justify-center laptop:justify-end text-xs px-5 text-gray-700 fixed bottom-0 z-[100]">© copyright 2024 | Waizly<strong>Test</strong></div>
      </div>
    </div>
  )
}

export default Dashboard