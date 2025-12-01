import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineGraphicEq } from "react-icons/md";
import { BiBookmarkAlt } from "react-icons/bi";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminItems from "./adminitem";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItem";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import AdminDashboard from "./adminDashboard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function AdminPage() {

    const [userValidated, setUserValidated] = useState(false);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      window.location.href = "/login";
    }
    axios.get(`${backendUrl}/api/users/`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data);
      const user = res.data;
      if(user.role == "admin"){
        setUserValidated(true);        
      }else{
        window.location.href = "/";
      }
      
    }).catch((err)=>{
      console.error(err);
      setUserValidated(false);
    })
  },[])

  return (
    <div className="w-full h-screen flex bg-primary">
      <div className="w-[200px] h-full bg-secondary border-r-4 border-border shadow-vintage-lg">
        <Link to ="/admin" className="w-full h-[50px] text-[20px] font-serif-vintage text-textColor hover:text-highlight hover:bg-interactive transition-all duration-300 flex justify-center items-center gap-2 border-b-2 border-border"> <MdOutlineGraphicEq /> Dashboard</Link>
        <Link to ="/admin/bookings" className="w-full h-[50px] text-[20px] font-serif-vintage text-textColor hover:text-highlight hover:bg-interactive transition-all duration-300 flex justify-center items-center gap-2 border-b-2 border-border"> <BiBookmarkAlt/> Bookings</Link>
        <Link to ="/admin/items" className="w-full h-[50px] text-[20px] font-serif-vintage text-textColor hover:text-highlight hover:bg-interactive transition-all duration-300 flex justify-center items-center gap-2 border-b-2 border-border"> <LuSpeaker />Items</Link>
        <Link to ="/admin/users" className="w-full h-[50px] text-[20px] font-serif-vintage text-textColor hover:text-highlight hover:bg-interactive transition-all duration-300 flex justify-center items-center gap-2 border-b-2 border-border"> <FaRegUser /> Users</Link>
      </div>
      <div className="w-[calc(100vw-200px)] bg-primary overflow-auto">
        
        {userValidated&&<Routes>
          <Route path = "/" element={<AdminDashboard />} />
          <Route path = "/bookings" element={<AdminOrdersPage />} />
          <Route path = "/items" element={<AdminItems />} />
          <Route path = "/users" element={<AdminUsersPage />} />
          <Route path = "/items/add" element={<AddItemPage />} />
          <Route path = "/items/edit" element={<UpdateItemPage />} />
        </Routes>}

      </div>
      
    </div>
  );
}
