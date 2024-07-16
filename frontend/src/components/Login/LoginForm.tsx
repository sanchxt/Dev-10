import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import FormContainer from "../FormContainer";
import { loginSchema } from "../../utils/schema";
import { LoginFormFields } from "../../utils/types";
import { UseFormSetError } from "react-hook-form";
import { useEffect } from "react";

interface ApiError {
  data?: {
    message?: string;
  };
  error?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: { auth: any }) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const onSubmit = async (
    data: LoginFormFields,
    setError: UseFormSetError<LoginFormFields>
  ) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({ ...response }));
      navigate("/");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
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
