import { FaChartPie } from "@react-icons/all-files/fa/FaChartPie"
import { FaCaretRight } from "@react-icons/all-files/fa/FaCaretRight"
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase"
import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight"
import { FaFile } from "@react-icons/all-files/fa/FaFile"
import { ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface Props {
  children: ReactNode
}

const Dashboard = ({ children }: Props) => {
  const navigate = useNavigate()
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
          route: null,
          active: false,
        }
      ]
    },
    {
      title: 'Backend 1',
      icon: <FaDatabase />,
      route: null,
      active: false,
    },
    {
      title: 'Backend 2',
      icon: <FaDatabase />,
      active: false,
      showChildrens: false,
      childrens: [
        {
          title: 'Test 1',
          route: null,
          active: false,
        },
        {
          title: 'Test 2',
          route: null,
          active: false,
        },
        {
          title: 'Test 3',
          route: null,
          active: false,
        },
        {
          title: 'Test 4',
          route: null,
          active: false,
        },
        {
          title: 'Test 5',
          route: null
        },
        {
          title: 'Test 6',
          route: null,
          active: false,
        },
        {
          title: 'Test 7',
          route: null,
          active: false,
        },
        {
          title: 'Test 8',
          route: null,
          active: false,
        }
      ]
    },
    {
      title: 'Frontend 2',
      icon: <FaDatabase />,
      active: false,
      showChildrens: false,
      childrens: [
        {
          title: 'Test 1',
          route: null,
          active: false,
        },
        {
          title: 'Test 2',
          route: null,
          active: false,
        },
        {
          title: 'Test 3',
          route: null,
          active: false,
        },
        {
          title: 'Test 4',
          route: null,
          active: false,
        },
        {
          title: 'Test 5',
          route: null,
          active: false,
        },
        {
          title: 'Test 6',
          route: null,
          active: false,
        },
        {
          title: 'Test 7',
          route: null,
          active: false,
        },
        {
          title: 'Test 8',
          route: null,
          active: false,
        }
      ]
    }
  ])

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
            className={`flex flex-row gap-2 items-center cursor-pointer duration-100 hover:text-orange-400 ${item_c?.active ? 'text-orange-400' : ''}`}
            onClick={() => {
              if (item_c?.route) {
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
          className={`flex flex-row justify-between mb-1 items-center cursor-pointer hover:text-orange-400 duration-100 ${item?.active ? 'text-orange-400' : ''}`}
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
        className={`w-fit cursor-pointer px-5 flex flex-row gap-2 items-center duration-100 hover:text-orange-400 ${item?.active ? 'text-orange-400' : ''}`}
        onClick={() => {
          if (item?.route) {
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
    <div className="flex flex-row w-screen h-screen bg-gray-200 overflow-y-scroll hide-scroll relative">
      <div className="w-[250px] h-full bg-gray-700 text-white flex flex-col gap-5 text-base overflow-y-scroll hide-scroll">
        <span className="w-full flex items-center justify-center text-2xl text-center p-5">Waizly<strong>Test</strong></span>

        <div className="w-full flex flex-col items-center justify-center gap-2 p-5">
          <img
            src="https://cdn.vectorstock.com/i/1000x1000/01/38/young-man-profile-vector-14770138.webp"
            alt="profile"
            className="w-[60px] h-[60px] object-cover rounded-full"
          />
          <span className="text-sm text-center">Ade Mugni Rusmana</span>
        </div>
        
        <div className="w-full h-full flex flex-col gap-4 text-base text-gray-500 font-bold">
          <span className="text-gray-600 text-xs">--- MENU</span>
          {renderMenu()}
          <span className="w-full min-h-[10px]"></span>
        </div>
      </div>

      <div className="w-full full flex flex-col">
        <div className="w-full min-h-[60px] bg-[#ffbc79] fixed top-0"></div>
        {children}
        <div className="w-full min-h-[40px] bg-gray-800 mt-5"></div>
      </div>
    </div>
  )
}

export default Dashboard