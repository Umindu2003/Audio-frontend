import { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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

            </div>
            </form>
        </div>
    );
}
