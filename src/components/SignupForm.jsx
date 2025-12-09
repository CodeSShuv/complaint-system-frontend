import { useState, useContext } from "react";
import Input from "./Input";
import Button from "./Button";

const SignupForm = ({ registerUser }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form
      className="flex flex-col gap-8 justify-center items-center shadow-xl rounded-2xl p-4 w-100 h-140
    bg-gradient-to-tr from-gray-300 via-white-200 to-purple-200"
    >
      <div className="heading text-4xl font-semibold text-purple-600">
        Sign Up
      </div>
      <Input
        type={"text"}
        placeholder={"Firstname"}
        name={"firstname"}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input
        type={"text"}
        placeholder={"Lastname"}
        name={"firstname"}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
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
      <Input
        type={"password"}
        placeholder={"Confirm Password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button
        text={"Signup"}
        event={(e) => {
          e.preventDefault();
          if (confirmPassword === password) {
            registerUser(firstName, lastName, email, password, confirmPassword);
            return;
          }
          alert("Pls confirm the same password");
        }}
      />
    </form>
  );
};

export default SignupForm;
