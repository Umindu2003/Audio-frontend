import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


export default function AdminItems() {
  return (
    <div className="w-full h-full relative">
        <Link to="/admin/items/add">
          <IoAddCircleOutline className="text-[50px] absolute right-2 bottom-2 hover:text-red-700 r" />
        </Link>
      </div>
  );
}
