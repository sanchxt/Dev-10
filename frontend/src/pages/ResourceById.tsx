import DetailedResource from "../components/resources/DetailedResource";
import Sidebar from "../components/shared/Sidebar";

const ResourceById = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow">
        <DetailedResource />
      </div>
    </section>
  );
};

export default ResourceById;
