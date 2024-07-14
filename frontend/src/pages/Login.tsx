import LoginContainer from "../components/Login/LoginContainer";
import PublicNavbar from "../components/shared/PublicNavbar";

const Login = () => {
  return (
    <section className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="h-fit shadow-xl">
        <PublicNavbar />
      </div>

      <div
        className="w-full flex-grow flex items-center"
        style={{
          background: "url('/test-bg.webp')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <LoginContainer />
      </div>
    </section>
  );
};

export default Login;
