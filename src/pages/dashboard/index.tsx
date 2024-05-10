import Breadcrumb from "./../../components/breadcrumb"

const Dashboard = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Dashboard"
        data={[
          { title: 'Dashboard', route: '', active: true }
        ]}
      />
      <div className="w-full h-full px-5">
        <div className="w-full h-fit rounded bg-white flex flex-col gap-5 p-5">
        </div>

        <div className="w-full h-[60px]"></div>
      </div>
    </div>
  )
}

export default Dashboard