import LinksForm from "./LinksForm";
import AboutCollectionForm from "./AboutCollectionForm";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { AboutResourceCollectionFields } from "../../utils/types";

const CreateResourceForm = () => {
  const { step, formData, nextStep } =
    useMultiStepForm<AboutResourceCollectionFields>();

  return (
    <div className="text-black h-full flex flex-col justify-center items-center">
      <div className="w-[99%] h-[99%] md:w-[95%] md:h-[95%]">
        {step === 1 && <AboutCollectionForm onSubmit={nextStep} />}
        {step === 2 && formData && <LinksForm formData={formData} />}
      </div>
    </div>
  );
};

export default CreateResourceForm;
