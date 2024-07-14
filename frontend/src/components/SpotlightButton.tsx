import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ButtonProps {
  isDisabled: boolean;
  text: string;
}

const SpotlightButton = ({ isDisabled, text }: ButtonProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const { width } = target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;

      spanRef.current!.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current!.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    btnRef.current!.addEventListener("mousemove", handleMouseMove);
    btnRef.current!.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btnRef.current!.removeEventListener("mousemove", handleMouseMove);
      btnRef.current!.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#fff]/80 via-[#d1cdcd]/90 to-[#b3afaf]/50 px-4 py-3 text-lg font-medium text-white"
      type="submit"
      disabled={isDisabled}
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {isDisabled ? "Loading..." : text}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-950"
      />
    </motion.button>
  );
};

export default SpotlightButton;
