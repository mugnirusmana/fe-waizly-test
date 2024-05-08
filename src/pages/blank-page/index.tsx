import Breadcrumb from "./../../components/breadcrumb"

const BlankPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 pt-[60px]">
      <Breadcrumb
        title="Blank Page"
        data={[
          { title: 'Blank Page', route: '', active: true }
        ]}
      />
      <div className="w-full h-full px-5">
        <div className="w-full h-full rounded bg-white">
          
        </div>
      </div>
    </div>
  )
}

export default BlankPage