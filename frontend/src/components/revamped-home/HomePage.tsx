import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div className="bg-green-400 h-full">
      <header className="bg-slate-200 flex gap-x-2 justify-between items-center px-0.5 sm:px-1 md:px-2">
        <h3 className="block text-lg sm:text-xl md:text-2xl min-w-28 md:min-w-48 w-fit font-base">
          Welcome,
          <br />
          <span className="block text-right w-full overflow-hidden text-ellipsis capitalize text-2xl sm:text-3xl md:text-4xl font-semibold">
            {userInfo?.name}
          </span>
        </h3>

        <div className="w-full bg-slate-300">hi</div>
      </header>
    </div>
  );
};

export default HomePage;
