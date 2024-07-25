import { IoIosArrowForward } from "react-icons/io";
import { useDropdown } from "../hooks/useDropdown";
import { AnimatePresence, motion } from "framer-motion";

const Dropdown = ({ label, items, onSelect }: any) => {
  const { isOpen, toggle, close } = useDropdown();

  return (
    <div className="relative inline-block px-1 md:px-2 pt-2 md:pt-3">
      <button
        type="button"
        onClick={toggle}
        className="px-4 py-2 w-[8.8rem] flex gap-1 justify-center items-center bg-transparent border-b text-black rounded-sm focus:outline-none text-xs capitalize"
      >
        {label}
        <IoIosArrowForward
          className={`transition-all ease-in-out duration-300 ${
            isOpen && "rotate-90"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10"
          >
            <div className="py-2 flex flex-col">
              {items.map((item: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    close();
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-xs capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
