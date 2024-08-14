import React, { useState } from "react";
import UpdateResourceForm from "./UpdateResourceForm";
import { useGetResourcesQuery } from "../../slices/resourcesApiSlice";
import { toast } from "react-toastify";

const UpdateResource: React.FC<{ resourceId: string }> = ({ resourceId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refetch: refetchResources } = useGetResourcesQuery();

  const handleUpdateClick = () => {
    setIsOpen(true);
  };

  const handleCloseForm = async (status?: string) => {
    setIsOpen(false);
    if (status === "success") {
      toast.success("Resource updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } else if (status === "error") {
      toast.error("Failed to update resource", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      <button
        onClick={handleUpdateClick}
        className="px-2 py-1 text-xl font-medium bg-purple-500 text-white rounded shadow hover:bg-purple-600 w-1/4 h-1/2"
      >
        Update Resource
      </button>
      {isOpen && (
        <UpdateResourceForm
          resourceId={resourceId}
          onClose={handleCloseForm}
          refetchResources={refetchResources}
        />
      )}
    </>
  );
};

export default UpdateResource;
