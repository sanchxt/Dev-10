import DisplayResources from "../components/resources/DisplayResources";
import Sidebar from "../components/shared/Sidebar";

const Resources = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow">
        <DisplayResources />
      </div>
    </section>
  );
};

export default Resources;
