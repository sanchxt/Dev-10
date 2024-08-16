
import DisplayDetailedRoadmap from '../components/roadmaps/DisplayDetailedRoadmap'
import Sidebar from "../components/shared/Sidebar";

const RoadmapById = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      {/* remove md:pl-[4rem] */}
      <div className="flex-grow md:pl-[4rem]">
        <DisplayDetailedRoadmap />
      </div>
    </section>
  );
};

export default RoadmapById;
