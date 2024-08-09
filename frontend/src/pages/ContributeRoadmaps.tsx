import CreateRoadmapForm from "../components/contribute/roadmaps/CreateRoadmapForm";
import Sidebar from "../components/shared/Sidebar";

const ContributeRoadmaps = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <CreateRoadmapForm />
      </div>
    </section>
  );
};

export default ContributeRoadmaps;
