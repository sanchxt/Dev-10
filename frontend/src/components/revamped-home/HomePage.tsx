import { useSelector } from "react-redux";
import { RootState } from "../../store";
import HomeHeader from "./HomeHeader";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="bg-slate-100 h-full">
      <HomeHeader name={userInfo?.name!} />
    </div>
  );
};

export default HomePage;
