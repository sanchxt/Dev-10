import { createPortal } from "react-dom";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CodeModalProps } from "../../utils/types";

const CodeModal = ({ isOpen, onRequestClose, code }: CodeModalProps) => {
  const [fileIndex, setFileIndex] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileIndex(Number(e.target.value));
  };

  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black px-1"
      onClick={onRequestClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full md:w-1/2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center pb-4 font-medium tracking-wide sm:text-lg md:text-xl">
          Code
        </h2>

        <div className="flex flex-col group relative pb-5">
          <label
            htmlFor="fileName"
            className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
          >
            File Name
          </label>
          <select
            id="fileName"
            value={fileIndex}
            onChange={handleFileChange}
            className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-gray-100 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
          >
            {code?.data.map((code, idx) => (
              <option value={idx} key={idx}>
                {code.fileName}
              </option>
            ))}
          </select>

          <div className="mt-8 text-xs md:text-sm max-h-96 overflow-y-scroll scrollbar-thin scrollbar-track-purple-100 scrollbar-thumb-purple-200">
            <pre className="whitespace-pre-wrap w-full">
              <SyntaxHighlighter
                language="javascript"
                customStyle={{
                  background: "none",
                  padding: 0,
                  fontFamily: "cursive",
                  overflowY: "hidden",
                }}
                style={materialLight}
                showLineNumbers
                wrapLongLines
              >
                {code?.data[fileIndex].code || ""}
              </SyntaxHighlighter>
            </pre>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("show-code")!
  );
};

export default CodeModal;
