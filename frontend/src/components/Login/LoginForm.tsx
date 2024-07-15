import FormContainer from "../FormContainer";
import { loginSchema } from "../../utils/schema";
import { LoginFormFields } from "../../utils/types";
import { UseFormSetError } from "react-hook-form";

const LoginForm = () => {
  const onSubmit = async (
    data: LoginFormFields,
    setError: UseFormSetError<LoginFormFields>
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "Incorrect email or password",
      });
    }
  };

  return (
    <FormContainer<LoginFormFields>
      schema={loginSchema}
      onSubmit={onSubmit}
      fields={[
        { id: "email", label: "Your e-mail", type: "text" },
        { id: "password", label: "Password", type: "password" },
      ]}
      submitButtonText="Login"
      errorMessage="Incorrect email or password"
      welcomeText="Welcome back!"
      additionalText="Welcome back to the place made specifically for aspiring developers, like you, looking to take their skills to the next level."
      sideImage="/login-gradient.webp"
      bottomText="Don't have an account yet? Register"
      redirectTo="/signup"
    />
  );
};

export default LoginForm;
