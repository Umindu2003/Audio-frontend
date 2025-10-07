import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";


export default function AdminItems() {
  const [items, setItems] = useState([]); 
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setItems(response.data);
        setItemsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    }
  }, [itemsLoaded]);
    
  const handleEdit = (key) => {
    if(window.confirm(`Are you sure you want to edit item ?`)) {
    setItems(items.filter((item) => item.key !== key));

    }
    // navigate or open modal logic here
  };

  const handleDelete = (key) => {
    if (window.confirm(`Are you sure you want to delete item ?`)) {
      setItems(items.filter((item) => item.key !== key));
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:3000/api/products/${key}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Item deleted:", response.data);
          setItemsLoaded(false); // Refresh items after deletion
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    }
    // delete logic here
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 relative flex items-center flex-col">
        {!itemsLoaded && <div className="border-4 my-4 bg-0 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>}

      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Admin Item Management
      </h1>

      {!itemsLoaded && <div className="overflow-x-auto rounded-lg shadow-lg bg-white " />}
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="py-3 px-4 text-left">Key</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price (LKR)</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Dimensions</th>
              <th className="py-3 px-4 text-left">Availability</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr
                key={product.key}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {product.key}
                </td>
                <td className="py-3 px-4 text-gray-700">{product.name}</td>
                <td className="py-3 px-4 text-gray-700">{product.price}</td>
                <td className="py-3 px-4 text-gray-700 capitalize">
                  {product.category}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {product.dimensions}
                </td>
                <td
                  className={`py-3 px-4 font-semibold ${
                    product.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.availability ? "In Stock" : "Out of Stock"}
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">

                  <button
                    onClick={() => {navigate(`/admin/items/edit` , {state: product})}}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 transition flex items-center gap-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.key)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      <Link to="/admin/items/add">
        <IoAddCircleOutline className="text-[60px] text-green-500 hover:text-green-600 transition absolute right-6 bottom-6 cursor-pointer" />
      </Link>
    </div>
  );
}
