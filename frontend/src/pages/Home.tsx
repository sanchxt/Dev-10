import Sidebar from "../components/shared/Sidebar";
import HomePage from "../components/home/HomePage";

const Home = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem] home-page-bg theme-transition">
        <HomePage />
      </div>
    </section>
  );
};

export default Home;
