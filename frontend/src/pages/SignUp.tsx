import PublicNavbar from "../components/shared/PublicNavbar";
import SignupForm from "../components/Sign-Up/SignupForm";

const SignUp = () => {
  return (
    <section className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="h-fit shadow-xl">
        <PublicNavbar />
      </div>

      <div
        className="w-full flex-grow flex items-center"
        style={{
          background: "url('/public-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <SignupForm />
      </div>
    </section>
  );
};

export default SignUp;
