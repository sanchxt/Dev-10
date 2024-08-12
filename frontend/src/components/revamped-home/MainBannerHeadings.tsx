// import mainBannerImage from "../../assets/coding-img.webp";

const MainBannerHeadings = () => {
  return (
    <div className="p-0.5 sm:p-1 lg:p-2 xl:p-3 grid gap-5 md:gap-7 relative">
      <h4 className="text-[0.7rem] md:text-sm italic font-light text-gray-700">
        Through our comprehensive set of
        <br />
        dev resources, you can..
      </h4>

      <h3 className="text-[0.8rem] sm:text-base md:text-lg">
        Empower <span className="font-bold">Your</span>
        <br /> Development Journey..
      </h3>

      <h2 className="text-base sm:text-2xl md:text-xl xl:text-3xl sm:tracking-wider lg:tracking-widest">
        STARTING
        <br />
        <span className="line-through font-extralight">TODAY</span>{" "}
        <span className="font-black underline">RIGHT NOW.</span>
      </h2>

      {/* <div className="absolute left-1/2 bottom-6 md:bottom-7 translate-x-1/2 lg:translate-x-2/3">
        <img src={mainBannerImage} alt="help" className="w-24 lg:w-full" />
      </div> */}
    </div>
  );
};

export default MainBannerHeadings;
