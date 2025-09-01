import { MdOutlineGraphicEq } from "react-icons/md";
import { BiBookmarkAlt } from "react-icons/bi";
import { LuSpeaker } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";


export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-[300px] h-full bg-green-200">
        <button className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <MdOutlineGraphicEq /> Dashboard</button>
        <button className="w-full h-[40px] text-[25px] font-bold  flex justify-center items-center"> <BiBookmarkAlt/> Bookings</button>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <LuSpeaker />Items</button>
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center"> <FaRegUser /> Users</button>
      </div>
      <div className="w-full bg bg-red-900">


      </div>
      
    </div>
  );
}
