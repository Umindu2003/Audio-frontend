import { MdOutlineGraphicEq } from "react-icons/md";
import { BiBookmarkAlt } from "react-icons/bi";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[300px] h-full bg-green-200">
        <Link to ="/" className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <MdOutlineGraphicEq /> Dashboard</Link>
        <Link to ="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <BiBookmarkAlt/> Bookings</Link>
        <Link to ="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <LuSpeaker />Items</Link>
        <Link to ="/admin/users" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <FaRegUser /> Users</Link>
      </div>
      <div className="w-[calc(100vw-300px)] bg bg-blue-900">
        <Routes>
          
          <Route path = "/bookings" element={<h1>Bookings</h1>} />
          <Route path = "/items" element={<h1>Items</h1>} />
          <Route path = "/users" element={<h1>Users</h1>} />

        </Routes>

      </div>
      
    </div>
  );
}
