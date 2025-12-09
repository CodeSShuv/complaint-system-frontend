import { useState, useContext } from "react";
import Input from "./Input";
import Button from "./Button";
import userContext from "../context/UserContext";
import apiRequest from "../services/apiClient";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    let dataModel = {
      email: email,
      password: password,
    };
    let data = await apiRequest({
      method: "POST",
      url: "/auth/login",
      data: dataModel,
      params: null,
    });

    setUser(data.data);
    navigate("/user-dashboard");
  };
  return (
    <form
      className="flex flex-col gap-8 justify-center items-center shadow-xl rounded-2xl p-3 w-100 h-100
    bg-gradient-to-tr from-gray-100 via-white-100 to-purple-100"
    >
      <div className="heading text-4xl font-semibold text-purple-600">
        Log In
      </div>
      <Input
        type={"email"}
        placeholder={"Email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type={"password"}
        placeholder={"Password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="underline">
        <a href="/">Forgot Password?</a>
      </p>
      <Button text={"Login"} event={handleLogin} />
    </form>
  );
};

export default LoginForm;
