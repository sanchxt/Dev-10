import { useSelector } from "react-redux";

import HomeHeader from "./HomeHeader";
import MainInfoBox from "./MainInfoBox";
import { RootState } from "../../store";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="bg-slate-100 h-full">
      <HomeHeader name={userInfo?.name!} />
      <div className="grid grid-cols-1 md:grid-cols-[57%_43%] lg:grid-cols-[60%_40%]">
        <div className="grid grid-cols-2">
          <div className="col-span-2 px-0.5 py-2 md:px-2 md:py-3">
            <MainInfoBox />
          </div>
          <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 bg-blue-200">
            <div className="bg-green-100 order-2 md:order-1">contris</div>
            <div className="bg-green-200 order-1 md:order-2">sponsors</div>
          </div>
        </div>

        <div className="bg-slate-400">
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2">
            <div className="">notes</div>
            <div className="">calendar</div>
          </div>
        </div>

        <div className="bg-blue-400">blogs</div>
        <div className="bg-blue-300">recents</div>
      </div>
    </div>
  );
};

export default HomePage;
