const NoContributionsMessage = ({ name }: { name: string }) => {
  return (
    <>
      <div className="flex flex-col gap-1 md:gap-1.5 items-center text-xs md:text-sm">
        <h3 className="tracking-wider">
          Hey,&nbsp;
          <span className="capitalize">{name}</span>
        </h3>
        <p className="italic text-gray-600 font-extralight">
          It looks like you haven't made any contributions yet!
        </p>
      </div>

      <div className="text-xs md:text-sm text-gray-800 font-light">
        <h2>
          Consider giving back to the community by adding your own{" "}
          <span className="text-blue-600 font-medium underline italic underline-offset-2">
            resources
          </span>{" "}
          or{" "}
          <span className="text-blue-600 font-medium underline italic underline-offset-2">
            roadmaps
          </span>
        </h2>
      </div>
    </>
  );
};

export default NoContributionsMessage;
