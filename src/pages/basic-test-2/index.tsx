import Breadcrumb from "./../../components/breadcrumb"

const BasicTest2 = () => {
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
        <div className="w-full h-full rounded bg-white"></div>
      </div>
    </div>
  )
}

export default BasicTest2