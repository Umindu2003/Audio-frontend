import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("http://localhost:3000/api/users", {
      email,
      firstName,
      lastName,
      password,
      address,
      phone,
    })
    .then((res) => {
      console.log(res);
      toast.success("Registration Successful");
      navigate("/login");
    })
    .catch((err) => {
      console.log(err);
      toast.error(err?.response?.data?.error || "Registration Failed");
    });
  }

  return (
    <div className="bg-picture h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="w-[400px] h-auto py-8 backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">

          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] h-[100px] object-cover mb-4 top-1"
          />

          <input
            type="text"
            placeholder="First Name"
            className="mt-4 w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            className="w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="my-6 w-[150px] h-[40px] bg-[#efac38] text-white rounded-md transition duration-300"
          >
            Register
          </button>

          <p className="text-white text-sm mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#efac38] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
