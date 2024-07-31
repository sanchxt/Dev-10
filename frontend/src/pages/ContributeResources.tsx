import Sidebar from "../components/shared/Sidebar";
import CreateResourceForm from "../components/contribute/CreateResourceForm";

const ContributeResources = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <CreateResourceForm />
      </div>
    </section>
  );
};

export default ContributeResources;
