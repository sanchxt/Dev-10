import Sidebar from "../components/shared/Sidebar";

const Home = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="text-black bg-green-400 flex-grow">hi</div>
    </section>
  );
};

export default Home;
