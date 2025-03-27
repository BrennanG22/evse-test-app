import Banner from "@/globalComponents/banner";
import APIContainer from "./apiContainer";

const manualAPI = () => {
  return (
    <div>
      <Banner />
      <div className="m-10">
        <APIContainer />
      </div>

    </div>
  );
}

export default manualAPI;