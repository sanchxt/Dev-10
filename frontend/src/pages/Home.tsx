import PrivateNavbar from "../components/PrivateNavbar";

const Home = () => {
  return (
    <section className="flex flex-col">
      <header className="bg-red-300">
        <PrivateNavbar />
      </header>
    </section>
  );
};

export default Home;
