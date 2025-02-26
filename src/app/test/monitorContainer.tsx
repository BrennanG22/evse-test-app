interface MonitorContainerProp {
  name?: string;
  children: React.ReactNode;
}

const MonitorContainer: React.FC<MonitorContainerProp> = ({ name, children }) => {
  return (
    <div className="border-blue-500 border-solid border-2 m-5 rounded-md">
      <div className="w-full h-1/6 bg-blue-500 justify-items-center ">
        <div>
          <strong>{name}</strong>
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-b-md">
        {children}
      </div>
    </div>
  )
}

export default MonitorContainer