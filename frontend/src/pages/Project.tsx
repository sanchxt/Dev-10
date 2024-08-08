import Sidebar from "../components/shared/Sidebar";
import ProjectStructure from "../components/home/ProjectStructure";

const Project = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen bg-resources-pg-bg theme-transition">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <ProjectStructure />
      </div>
    </section>
  );
};

export default Project;
