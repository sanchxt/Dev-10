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
          <MdKeyboardArrowLeft color="#000" />
        ) : (
          <MdKeyboardArrowRight color="#000" />
        )}
      </button>
    );
  }
);

export default PaginationButton;
