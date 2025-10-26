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
    <div className="relative h-screen flex justify-center items-center bg-primary">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-picture bg-cover bg-center blur-md"></div>
      
      {/* Register Form */}
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="w-[400px] h-auto py-8 vintage-card backdrop-blur-lg flex flex-col justify-center items-center relative shadow-vintage-xl">

          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] h-[100px] object-cover mb-4 border-4 border-accent rounded-full shadow-vintage"
          />
          
          <h2 className="text-3xl font-classic font-bold text-accent mb-6">Register</h2>

          <input
            type="text"
            placeholder="First Name"
            className="mt-2 w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="text"
            placeholder="Address"
            className="w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone"
            className="w-[300px] h-[40px] mb-3 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="my-6 vintage-button w-[200px] h-[45px]"
          >
            Register
          </button>

          <p className="text-textColor text-sm mt-2 font-vintage">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-accent hover:text-highlight cursor-pointer font-semibold transition-all duration-300"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
