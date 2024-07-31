// name, email, password

import Sidebar from "../components/shared/Sidebar";
import UpdateProfileForm from "../components/UpdateProfileForm";

const ProfilePage = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <div className="flex-grow md:pl-[4rem]">
        <UpdateProfileForm />
      </div>
    </section>
  );
};

export default ProfilePage;
