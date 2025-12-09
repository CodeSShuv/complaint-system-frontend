import SignupForm from "../components/SignupForm";
import apiRequest from "../services/apiClient";

const Registerpage = () => {
  const registerUser = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  ) => {
    let res = await apiRequest({
      method: "POST",
      url: "/auth/signup",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
    });
    console.log(res);
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <SignupForm registerUser={registerUser} />
    </div>
  );
};

export default Registerpage;
