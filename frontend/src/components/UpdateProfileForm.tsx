import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import { updateProfileSchema } from "../utils/schema";
import { ApiError, UpdateProfileFields, UserInfo } from "../utils/types";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const UpdateProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo | null } }) => state.auth
  );

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFields>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      oldPassword: "",
      newPassword: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFields> = async (data) => {
    try {
      const filteredData = {
        name: data.name,
        email: data.email,
        ...(data.oldPassword && { oldPassword: data.oldPassword }),
        ...(data.newPassword && { newPassword: data.newPassword }),
        ...(data.description && { description: data.description }),
      };
      const response = await updateProfile(filteredData).unwrap();
      dispatch(setCredentials(response));
      toast.success("Profile successfully updated");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || err.error);
    }
  };

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
          <div className="w-full h-full bg-slate-400/80 rounded-tl-[5rem] rounded-xl profile-form-shadow text-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Name</label>
                <input {...register("name")} type="text" id="name" />
                {errors.name && <p>{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email">E-mail</label>
                <input {...register("email")} type="text" id="email" />
                {errors.email && <p>{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  {...register("oldPassword")}
                  type="text"
                  id="oldPassword"
                />
                {errors.oldPassword && <p>{errors.oldPassword.message}</p>}
              </div>

              <div>
                <label htmlFor="newPassword">New Password</label>
                <input
                  {...register("newPassword")}
                  type="text"
                  id="newPassword"
                />
                {errors.newPassword && <p>{errors.newPassword.message}</p>}
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <input
                  {...register("description")}
                  type="text"
                  id="description"
                />
                {errors.description && <p>{errors.description.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting || isLoading}>
                {isLoading ? "Loading..." : "Update Profile"}
              </button>

              {errors.root && <div>{errors.root.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
