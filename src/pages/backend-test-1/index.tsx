import Breadcrumb from "./../../components/breadcrumb"
import Table from "./../../components/table"
import Loader from "./../../components/loader"

const BackendTest1 = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Backend"
        subtitle="Test 1"
        data={[
          { title: 'Test 1', route: '', active: true }
        ]}
      />
      <div className="w-full h-fit px-5 flex flex-col gap-5">
        <div className="w-full h-fit rounded bg-white flex p-5">
          <Table
            titles={[
              {
                name: 'Title 1',
                key: 'id',
                position: 'left'},
              {
                name: 'Title 2',
                key: 'name',
                position: 'left'},
              {
                name: 'Title 3',
                key: 'title',
                position: 'left',
                constumRender: (item) => {
                  if(item?.title === 'title 1') return <div className="border border-blue-700 bg-blue-700 w-fit rounded text-xs px-2 text-white">{item.title}</div>
                  if(item?.title === 'title 5') return <div className="border border-green-700 bg-green-700 w-fit rounded text-xs px-2 text-white">{item.title}</div>
                  return <div className="border border-red-700 bg-red-700 w-fit rounded text-xs px-2 text-white">{item.title}</div>
                }
              },
              {
                name: 'Title 4',
                key: 'desc',
                position: 'left'},
              {
                name: 'Title 5',
                key: 'created_at',
                position: 'left',
                constumRender: () => { return 'just created_at'}},
            ]}
            data={[
              {
                id: 1,
                name: 'name 1',
                title: 'title 1',
                desc: 'desc 1',
                created_at: '2024-05-10T14:20:50'
              },
              {
                id: 2,
                name: 'name 2',
                title: 'title 2',
                desc: 'desc 2',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 3,
                name: 'name 3',
                title: 'title 3',
                desc: 'desc 3',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 4,
                name: 'name 4',
                title: 'title 4',
                desc: 'desc 4',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 5,
                name: 'name 5',
                title: 'title 5',
                desc: 'desc 5',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 6,
                name: 'name 6',
                title: 'title 6',
                desc: 'desc 6',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 7,
                name: 'name 7',
                title: 'title 7',
                desc: 'desc 7',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 8,
                name: 'name 8',
                title: 'title 8',
                desc: 'desc 8',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 9,
                name: 'name 9',
                title: 'title 9',
                desc: 'desc 9',
                created_at: '2024-05-11T14:20:50'
              },
              {
                id: 10,
                name: 'name 10',
                title: 'title 10',
                desc: 'desc 10',
                created_at: '2024-05-11T14:20:50'
              }
            ]}
            withNo={true}
            withAction={true}
            withFooter={true}
            perPage={10}
            currentPage={1}
            totalPage={10}
            totalData={100}
            pages={[1,2,3,4,5,6,7,8,9,10,11]}
            renderAction={(item) => (
              <div className="w-full flex flex-row justify-end gap-2">
                <span className="w-fit h-fit rounded border border-gray-400 items-center justify-center text-center px-2 text-xs cursor-pointer">A</span>
                <span className="w-fit h-fit rounded border border-gray-400 items-center justify-center text-center px-2 text-xs cursor-pointer">A</span>
                <span className="w-fit h-fit rounded border border-gray-400 items-center justify-center text-center px-2 text-xs cursor-pointer">A</span>
              </div>
            )}
            onChangePerPage={(page) => console.log('onChangePerPage => ', page)}
            onNextPage={(page) => console.log('onNextPage => ', page)}
            onPrevPage={(page) => console.log('onPrevPage => ', page)}
            onGoToPage={(page) => console.log('onGoToPage => ', page)}
          />
        </div>
        <div className="w-full h-[40px]"></div>
      </div>

      <Loader />
    </div>
  )
}

export default BackendTest1