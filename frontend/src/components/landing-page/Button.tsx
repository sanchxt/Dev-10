import { twMerge } from "tailwind-merge";
import { LandingButtonProps } from "../../utils/types";

const Button = ({
  children,
  size = "medium",
  className,
}: LandingButtonProps) => {
  const sizeClassNames = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-5 py-3",
    large: "text-base px-8 py-4",
  };

  return (
    <button
      className={twMerge(
        "bg-white text-black rounded-full",
        sizeClassNames[size],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
