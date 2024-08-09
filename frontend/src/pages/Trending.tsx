import Sidebar from '../components/shared/Sidebar';
import DisplayTrending from '../components/trending/DisplayTrending';

const Trending = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen bg-resources-pg-bg theme-transition">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem] ">
        <DisplayTrending />
      </div>
    </section>
  );
};

export default Trending;
