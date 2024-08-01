import DetailedResource from "../components/resources/DetailedResource";
import Sidebar from "../components/shared/Sidebar";

const ResourceById = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      {/* remove md:pl-[4rem] */}
      <div className="flex-grow md:pl-[4rem]">
        <DetailedResource />
      </div>
    </section>
  );
};

export default ResourceById;
