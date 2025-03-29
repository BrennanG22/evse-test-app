import Banner from "@/globalComponents/banner";
import APIContainer from "./apiContainer";

export const dynamic = "force-dynamic";

function manualAPI() {
  return (
    <div>
      <div className="sticky top-0">
        <Banner />
      </div>
      <div className="m-10 ">
        <APIContainer />
      </div>

    </div>
  );
}

export default manualAPI;