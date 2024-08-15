const FeaturedBlogs = () => {
  return (
    <div className="bg-slate-300 h-full rounded-xl shadow-xl grid grid-rows-[auto_1fr]">
      <h1 className="italic text-center pt-2 pb-1 font-medium lg:tracking-wide text-base lg:text-xl">
        Featured Blogs
      </h1>

      <div className="px-3 py-1 md:py-2">
        <div className="grid grid-cols-2 lg:grid-cols-[20%_60%_20%] h-full">
          <div className="p-2">
            <div className="bg-white h-full p-1 shadow-md rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm">
                Some Random Title 1
              </h2>
            </div>
          </div>

          <div className="p-2 order-1 lg:order-none col-span-2 lg:col-span-1">
            <div className="bg-white h-full p-1 shadow-md rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm">
                Some Random Title 2
              </h2>
            </div>
          </div>

          <div className="p-2">
            <div className="bg-white h-full p-1 shadow-md rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm">
                Some Random Title 3
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
