import Sidebar from '../components/shared/Sidebar';
import DisplayRoadmap from '../components/roadmaps/DisplayRoadmap';

const Roadmap = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen bg-resources-pg-bg theme-transition">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem] ">
        <DisplayRoadmap />
      </div>
    </section>
  );
};

export default Roadmap;
