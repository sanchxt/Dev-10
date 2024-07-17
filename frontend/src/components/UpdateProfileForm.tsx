const UpdateProfileForm = () => {
  return (
    <div className="w-full h-full flex flex-col text-black">
      <div className="text-center sm:py-1 px-1 xl:py-8 flex flex-col items-center gap-2 xl:gap-4">
        <p className="text-xs italic">
          Made a typo? Or is it that old name or email that everyone starts to
          hate at some point? We&apos;ve got you covered!
        </p>
        <p className="text-sm text-blue-800 font-medium py-1 px-2 bg-gradient-to-r from-slate-800/10 to-slate-700/20 rounded-2xl">
          Edit your profile
        </p>
      </div>

      <div className="w-full flex-grow mt-2 flex justify-center md:items-center px-2 py-4">
        <div className="w-full h-full md:w-2/3 md:h-3/4 bg-cyan-100/20 rounded-xl profile-inset-shadow">
          <div className="w-full h-full bg-slate-400/80 rounded-tl-[5rem] rounded-xl profile-form-shadow" />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
