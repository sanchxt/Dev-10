import FormContainer from "../FormContainer";
import { signupSchema } from "../../utils/schema";
import { SignupFormFields } from "../../utils/types";
import { UseFormSetError } from "react-hook-form";

const SignupForm = () => {
  const onSubmit = async (
    data: SignupFormFields,
    setError: UseFormSetError<SignupFormFields>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "E-mail has already been taken",
      });
    }
  };

  return (
    <FormContainer<SignupFormFields>
      schema={signupSchema}
      onSubmit={onSubmit}
      fields={[
        { id: "email", label: "Your e-mail", type: "text" },
        { id: "confirmEmail", label: "Confirm e-mail", type: "text" },
        { id: "password", label: "Password", type: "password" },
        { id: "confirmPassword", label: "Confirm password", type: "password" },
      ]}
      submitButtonText="Sign Up"
      errorMessage="E-mail has already been taken"
      welcomeText="Welcome!"
      additionalText="Welcome to the place made specifically for aspiring developers, like you, looking to take their skills to the next level."
      sideImage="/login-img.webp"
      bottomText="Already have an account? Login"
      redirectTo="/login"
    />
  );
};

export default SignupForm;
