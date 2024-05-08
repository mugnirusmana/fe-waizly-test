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
        <div className="w-full h-full rounded bg-white"></div>
      </div>
    </div>
  )
}

export default Dashboard