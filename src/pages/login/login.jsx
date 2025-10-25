import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
      // Keep popup flow; add standard scopes and prompt
      scope: "openid email profile",
      prompt: "select_account",
      onSuccess: async (res) => {
        try {
          setIsGoogleLoading(true);
          console.log(res);
          const response = await axios.post(
            `http://localhost:3000/api/users/google`,
            { accessToken: res.access_token },
            { headers: { "Content-Type": "application/json" } }
          );
          console.log(response);
          toast.success("Login Success");
          const user = response.data.user;
          localStorage.setItem("token", response.data.token);
          if (user?.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        } catch (err) {
          console.log(err);
          const message = err?.response?.data?.error || "Google login failed";
          toast.error(message);
        } finally {
          setIsGoogleLoading(false);
        }
      },
      onError: (err) => {
        console.log("Google OAuth error", err);
        toast.error("Google sign-in was cancelled or failed.");
      },
    });


    function handleSubmit(e) {  
        e.preventDefault();
        console.log(email , password);

        axios.post("http://localhost:3000/api/users/login", 
            { 
                email : email,
                password : password 
            }).then((res) => {
                console.log(res);
                toast.success("Login Successful");
                const user = res.data.user
                localStorage.setItem("token", res.data.token);

                if (user.role === "admin") {
                    navigate("/admin"); // if the user is admin, redirect to admin page
                }else{
                    navigate("/");
                }

            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.error );
            });
            
    }

    return (
        <div className="bg-picture w-full h-screen justify-center items-center flex">
            <form onSubmit={handleSubmit}>
            <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl justify-center items-center flex flex-col relative">

                <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover mb-4  top-1"/>
                <input type="email" placeholder="Email" className="mt-6  w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" className="mt-6 w-[300px] h-[30px] mb-4 rounded-md p-2 bg-transparent border-b-2 text-white outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="my-8 w-[150px] h-[40px] bg-[#efac38] text-white rounded-md  transition duration-300">Login</button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isGoogleLoading) googleLogin();
                  }}
                  disabled={isGoogleLoading}
                  className={`my-2 w-[300px] h-[50px] rounded-lg text-2xl text-white transition disabled:opacity-60 disabled:cursor-not-allowed ${
                    isGoogleLoading ? "bg-[#efac38]/80" : "bg-[#efac38]"
                  }`}
                >
                  {isGoogleLoading ? "Signing in..." : "Login with Google"}
                </button>
            </div>
            </form>
        </div>
    );
}
