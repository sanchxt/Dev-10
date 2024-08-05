import HomeHeader from "./HomeHeader";
import WelcomeBanner from "./WelcomeBanner";

const HomePage = () => {
  return (
    <div className="px-1">
      <HomeHeader />
      <WelcomeBanner />

      <div className="pt-4 w-full md:pl-2 lg:pl-4 xl:pl-6">
        <div className="w-full grid md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full xl:col-span-2 px-1 lg:pr-4 xl:pr-8">
            <h1 className="text-center py-1">Notes</h1>
            <div className="w-full max-w-full bg-slate-100 rounded-lg grid grid-cols-2 lg:grid-cols-3 gap-1 p-1">
              <div className="bg-blue-200 h-32 lg:h-48 rounded-lg p-1">
                <h2 className="text-[0.7rem] md:text-xs lg:text-sm">
                  Sticky note title
                </h2>
              </div>
              <div className="bg-blue-400 h-32 lg:h-48 rounded-lg">b</div>
              <div className="col-span-2 lg:col-span-1 bg-blue-600 h-32 lg:h-48 rounded-lg">
                c
              </div>
            </div>
          </div>

          <div className="w-full  bg-slate-300">
            <h1 className="text-center py-1">Game</h1>
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
