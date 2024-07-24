import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const TextFlipAnimated = ({ children }: { children: string }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="overflow-hidden relative md:font-bold xl:font-black w-fit mx-auto"
    >
      <div>
        {children.split("").map((letter, idx) => {
          return (
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * idx,
              }}
              className="inline-block whitespace-pre bg-gradient-to-r text-transparent bg-clip-text from-gray-800 to-gray-700"
              key={idx}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>

      <div className="absolute inset-0">
        {children.split("").map((letter, idx) => {
          return (
            <motion.span
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * idx,
              }}
              className="inline-block whitespace-pre bg-gradient-to-r text-transparent bg-clip-text from-cyan-950 to-cyan-800"
              key={idx}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TextFlipAnimated;
