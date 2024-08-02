import { memo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationButton = memo(
  ({
    onClick,
    disabled,
    direction,
  }: {
    onClick: () => void;
    disabled: boolean;
    direction: "prev" | "next";
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="pagination-button"
      >
        {direction === "prev" ? (
          <MdKeyboardArrowLeft className="text-pagination-btn" />
        ) : (
          <MdKeyboardArrowRight className="text-pagination-btn" />
        )}
      </button>
    );
  }
);

export default PaginationButton;
