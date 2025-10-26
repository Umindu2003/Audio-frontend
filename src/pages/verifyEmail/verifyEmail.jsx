import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function VerifyEmail(){
    const token = localStorage.getItem("token")
    const [otp,setOtp] = useState("")
    const navigate = useNavigate()
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/users/sendOTP`,{
            headers:{
                Authorization : `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.error(err)
        })
    })
    function handleVerifyEmail(){
        axios.post(`http://localhost:3000/api/users/verifyEmail`,{
            code : parseInt(otp)
        },{
            headers:{
                Authorization : `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res)
            toast.success("Email Verified")
            navigate("/")
        }
        ).catch((err)=>{
            console.error(err)
            toast.error("Invalid OTP")
        })
    }
    return(
        <div className="w-full h-screen flex justify-center items-center bg-primary">
            <div className="w-[400px] h-[350px] vintage-card flex flex-col justify-center items-center gap-4 p-6">
                <h1 className="text-3xl font-bold font-classic text-accent border-b-2 border-accent pb-2">Verify Email</h1>
                <p className="text-textColor font-serif-vintage text-center">Please verify your email to continue</p>
                <input 
                    type="number" 
                    placeholder="Enter OTP" 
                    value={otp} 
                    onChange={(e)=>setOtp(e.target.value)} 
                    className="vintage-input w-[80%] text-center text-lg"
                />
                <button onClick={handleVerifyEmail} className="vintage-button w-[80%] py-3">Verify</button>
            </div>
        </div>
    )
}