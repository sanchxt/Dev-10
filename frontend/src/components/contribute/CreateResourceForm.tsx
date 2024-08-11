// import LinksForm from "./LinksForm";
// import AboutCollectionForm from "./AboutCollectionForm";
// import { useMultiStepForm } from "../../hooks/useMultiStepForm";
// import { AboutResourceCollectionFields } from "../../utils/types";

// const CreateResourceForm = () => {
//   const { step, formData, nextStep } =
//     useMultiStepForm<AboutResourceCollectionFields>();

//   return (
//     <div className="h-full flex flex-col justify-center items-center">
//       <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
//         {step === 1 && <AboutCollectionForm onSubmit={nextStep} />}
//         {step === 2 && formData && <LinksForm formData={formData} />}
//       </div>
//     </div>
//   );
// };

// export default CreateResourceForm;

import AboutCollectionForm from "./AboutCollectionForm";
import { AboutResourceCollectionFields } from "../../utils/types";

const CreateResourceForm = () => {
  const handleSubmit = async (data: AboutResourceCollectionFields) => {
    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit resource');
      }

      // Handle successful submission (e.g., show success message, redirect)
      console.log('Resource submitted successfully');
    } catch (error) {
      console.error('Error submitting resource:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
        <AboutCollectionForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateResourceForm;
