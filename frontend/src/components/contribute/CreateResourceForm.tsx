// // import LinksForm from "./LinksForm";
// // import AboutCollectionForm from "./AboutCollectionForm";
// // import { useMultiStepForm } from "../../hooks/useMultiStepForm";
// // import { AboutResourceCollectionFields } from "../../utils/types";

// // const CreateResourceForm = () => {
// //   const { step, formData, nextStep } =
// //     useMultiStepForm<AboutResourceCollectionFields>();

// //   return (
// //     <div className="h-full flex flex-col justify-center items-center">
// //       <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
// //         {step === 1 && <AboutCollectionForm onSubmit={nextStep} />}
// //         {step === 2 && formData && <LinksForm formData={formData} />}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateResourceForm;

// import AboutCollectionForm from "./AboutCollectionForm";
// import { AboutResourceCollectionFields } from "../../utils/types";

// const CreateResourceForm = () => {
//   const handleSubmit = async (data: AboutResourceCollectionFields) => {
//     try {
//       const response = await fetch('/api/resources', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to submit resource');
//       }

//       // Handle successful submission (e.g., show success message, redirect)
//       console.log('Resource submitted successfully');
//     } catch (error) {
//       console.error('Error submitting resource:', error);
//       // Handle error (e.g., show error message)
//     }
//   };

//   return (
//     <div className="h-full flex flex-col justify-center items-center">
//       <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
//         <AboutCollectionForm onSubmit={handleSubmit} />
//       </div>
//     </div>
//   );
// };

// export default CreateResourceForm;


import { useState } from "react";
import AboutCollectionForm from "./AboutCollectionForm";
import { z } from "zod";

// Define the resource schema (make sure this matches the one in AboutCollectionForm)
const resourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  language: z.string().min(1, "Language is required"),
  description: z.string().min(1, "Description is required"),
  link: z.string().url("Must be a valid URL"),
});

type ResourceFields = z.infer<typeof resourceSchema>;

const CreateResourceForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (resource: ResourceFields) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resource),
      });

      if (!response.ok) {
        throw new Error('Failed to submit resource');
      }

      console.log('Resource submitted successfully');
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting resource:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
        <AboutCollectionForm onSubmit={handleSubmit} />
        {isSubmitting && <p>Submitting resources...</p>}
        {submitStatus === 'success' && <p className="text-green-500">Resources submitted successfully!</p>}
        {submitStatus === 'error' && <p className="text-red-500">Error submitting resources. Please try again.</p>}
      </div>
    </div>
  );
};

export default CreateResourceForm;