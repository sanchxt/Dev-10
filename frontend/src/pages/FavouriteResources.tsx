import Sidebar from "../components/shared/Sidebar";
import DisplayFavoriteResources from "../components/resources/DisplayFavouriteResources";

const FavouriteResources = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen bg-resources-pg-bg theme-transition">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <DisplayFavoriteResources />
      </div>
    </section>
  );
};

export default FavouriteResources;
