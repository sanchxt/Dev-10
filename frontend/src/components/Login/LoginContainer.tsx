import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaHandSparkles, FaInstagram, FaTwitter } from "react-icons/fa6";

import "./image-hover.css";
import SpotlightButton from "../SpotlightButton";
import { loginSchema } from "../../utils/schema";
import { LoginFormFields } from "../../utils/types";

const socialIcons = [
  {
    link: "https://www.twitter.com",
    icon: <FaTwitter size={24} color="#000" />,
  },
  {
    link: "https://www.instagram.com",
    icon: <FaInstagram size={24} color="#000" />,
  },
];

const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "this email is already taken",
      });
    }
  };

  return (
    <section className="mx-auto w-full h-full md:rounded-2xl md:w-[95%] md:h-[95%] glass-container flex flex-col">
      <h1 className="text-3xl sm:text-5xl xl:text-6xl flex justify-center items-center py-8">
        Welcome back!
      </h1>

      <div className="w-full flex-grow md:rounded-b-2xl flex">
        <div className="w-full lg:w-[60%] 2xl:w-1/2 lg:rounded-bl-2xl px-1 sm:px-2 flex flex-col">
          <p className="w-full sm:w-4/5 md:w-3/4 italic text-gray-400 text-sm lg:text-base xl:text-xl pt-2">
            Welcome back to the place made specifically for aspiring developers,
            like you, looking to take their skills to the next level.
          </p>

          <p className="pt-16 text-gray-300 flex gap-2">
            <span>
              <FaHandSparkles color="#54e7f7" />
            </span>
            Please login to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="relative mt-6">
              <input
                {...register("email")}
                type="text"
                id="email"
                className="floating-input peer"
                placeholder=""
              />
              <label htmlFor="email" className="floating-label">
                Your e-mail
              </label>

              {errors.email && (
                <div className="text-red-300">{errors.email.message}</div>
              )}
            </div>

            <div className="relative mt-6">
              <input
                {...register("password")}
                type="password"
                id="password"
                className="floating-input peer"
                placeholder=""
              />
              <label htmlFor="password" className="floating-label">
                Password
              </label>
              {errors.password && (
                <div className="text-red-300">{errors.password.message}</div>
              )}
            </div>

            {/* <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Loading..." : "Submit"}
            </button> */}
            <div className="flex justify-center mt-12 md:mt-16">
              <SpotlightButton isDisabled={isSubmitting} />
            </div>

            {errors.root && (
              <div className="text-red-300">{errors.root.message}</div>
            )}
          </form>

          <div className="flex-grow flex justify-end items-end pb-8 pr-8 gap-8 w-full">
            {socialIcons.map((item, idx) => (
              <a
                href={item.link}
                key={idx}
                className="bg-white/70 p-2 rounded-full"
                target="_blank"
                rel="noreferrer"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* side image */}
        <div className="w-0 lg:w-[40%] 2xl:w-1/2 lg:rounded-2xl flex items-center">
          <div
            className="w-[98%] h-[95%] bg-red-300 mx-auto rounded-2xl bg-contain bg-blend-hard-light saturate-50 bg-repeat login-img glow"
            style={{
              backgroundImage: "url('/login-img.webp')",
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default LoginContainer;
