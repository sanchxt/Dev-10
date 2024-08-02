import DisplayResources from "../components/resources/DisplayResources";
import Sidebar from "../components/shared/Sidebar";

const Resources = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen bg-resources-pg-bg theme-transition">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <DisplayResources />
      </div>
    </section>
  );
};

export default Resources;
