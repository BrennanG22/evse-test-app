import Banner from "@/globalComponents/banner";
import CANTable from "./canTable";

const CANMonitor = () => {
  return (
    <div>
      <Banner />
      <div className="m-4">
        <CANTable />
      </div>
    </div>
  )
}

export default CANMonitor;