import Sidebar from "../components/shared/Sidebar";

const Home = () => {
  return (
    <section className="md:flex">
      <Sidebar />
      <div className="text-black bg-green-400 flex-grow">hi</div>
    </section>
  );
};

export default Home;
