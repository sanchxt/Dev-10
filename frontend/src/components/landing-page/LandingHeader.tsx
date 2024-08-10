import { Link } from "react-router-dom";

const LandingHeader = () => {
  return (
    <>
      <header className="bg-landing-bg-contrast px-6 min-h-11 flex items-center text-green-50">
        <Link to="/home" className="h-11 flex items-center px-6 -ml-6">
          <img src="/Dev10-Logo2.png" alt="" className="w-8" />
          <span className="sr-only">Go to home page</span>
        </Link>
      </header>

      <div className="bg-landing-bg-contrast px-6 text-green-50 min-h-11 flex items-center">
        Dev-10
      </div>
    </>
  );
};

export default LandingHeader;
