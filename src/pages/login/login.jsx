import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

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
          
          // Admins bypass email verification
          if (user?.role === "admin") {
            navigate("/admin/");
            return;
          }

          // Regular users need email verification
          if (user?.emailVerified === false) {
            navigate("/verify-email");
            return;
          }

          navigate("/");
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

                // Admins bypass email verification
                if (user.role === "admin") {
                    navigate("/admin"); // if the user is admin, redirect to admin page
                    return;
                }

                // Regular users need email verification
                if(user.emailVerified == false){
                    navigate("/verify-email")
                    return
                }

                navigate("/");


            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.error );
            });
            
    }

    return (
        <div className="relative w-full h-screen flex justify-center items-center bg-primary">
            {/* Blurred Background */}
            <div className="absolute inset-0 bg-picture bg-cover bg-center blur-md"></div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="relative z-10">
            <div className="w-[400px] h-[450px] vintage-card backdrop-blur-lg flex flex-col justify-center items-center relative shadow-vintage-xl">

                <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] object-cover mb-6 border-4 border-accent rounded-full shadow-vintage"/>
                <h2 className="text-3xl font-classic font-bold text-accent mb-6">Login</h2>
                <input type="email" placeholder="Email" className="mt-4 w-[300px] h-[40px] mb-4 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Password" className="w-[300px] h-[40px] mb-4 rounded-md p-3 bg-interactive bg-opacity-50 border-2 border-border text-textColor outline-none focus:border-accent focus:ring-2 focus:ring-highlight font-vintage transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="my-4 vintage-button w-[200px] h-[45px]">Login</button>
                <button
                  type="button"
                  onClick={() => {
                    if (!isGoogleLoading) googleLogin();
                  }}
                  disabled={isGoogleLoading}
                  className={`my-2 w-[300px] h-[45px] rounded-lg font-serif-vintage text-lg transition-all shadow-vintage border-2 border-border flex items-center justify-center gap-2 ${
                    isGoogleLoading ? "bg-highlight text-primary opacity-60 cursor-not-allowed" : "bg-accent text-primary hover:bg-highlight hover:scale-105"
                  }`}
                >
                  <FcGoogle className="text-2xl" />
                  {isGoogleLoading ? "Signing in..." : "Login with Google"}
                </button>
            </div>
            </form>
        </div>
    );
}
