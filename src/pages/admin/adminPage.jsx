import { MdOutlineGraphicEq } from "react-icons/md";
import { BiBookmarkAlt } from "react-icons/bi";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import AdminItems from "./adminitem";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItem";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[200px] h-full bg-green-200">
        <Link to ="/" className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <MdOutlineGraphicEq /> Dashboard</Link>
        <Link to ="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <BiBookmarkAlt/> Bookings</Link>
        <Link to ="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <LuSpeaker />Items</Link>
        <Link to ="/admin/users" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <FaRegUser /> Users</Link>
      </div>
      <div className="w-[calc(100vw-200px)] bg ">
        <Routes>
          
          <Route path = "/bookings" element={<h1>Bookings</h1>} />
          <Route path = "/items" element={<AdminItems />} />
          <Route path = "/users" element={<h1>Users</h1>} />
          <Route path = "/items/add" element={<AddItemPage />} />
          <Route path = "/items/edit" element={<UpdateItemPage />} />
        </Routes>

      </div>
      
    </div>
  );
}
