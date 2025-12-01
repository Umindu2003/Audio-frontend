import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export default function AdminItems() {
  const [items, setItems] = useState([]); 
  const [itemsLoaded, setItemsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!itemsLoaded) {
      const token = localStorage.getItem("token");
    axios
      .get(`${backendUrl}/api/products`, {
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
        .delete(`${backendUrl}/api/products/${key}`, {
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
    <div className="w-full min-h-screen bg-primary p-6 relative flex items-center flex-col">
        {!itemsLoaded && (
          <div className="flex justify-center items-center h-64">
            <div className="border-4 my-4 bg-0 border-b-accent rounded-full animate-spin w-[100px] h-[100px]"></div>
          </div>
        )}

      <h1 className="text-4xl font-serif-vintage text-textColor mb-8 border-b-4 border-accent pb-4 text-center w-full">
        Admin Item Management
      </h1>

      {itemsLoaded && (
        <div className="overflow-x-auto rounded-lg shadow-vintage-lg w-full">
          <table className="min-w-full border-collapse bg-secondary border-2 border-border">
            <thead>
              <tr className="bg-interactive border-b-4 border-border">
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">KEY</th>
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">NAME</th>
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">PRICE (LKR)</th>
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">CATEGORY</th>
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">DIMENSIONS</th>
                <th className="py-4 px-6 text-left text-textColor font-serif-vintage text-lg">AVAILABILITY</th>
                <th className="py-4 px-6 text-center text-textColor font-serif-vintage text-lg">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr
                  key={product.key}
                  className="border-b-2 border-border hover:bg-primary transition-colors duration-200"
                >
                  <td className="py-4 px-6 font-vintage font-bold text-textColor text-base">
                    {product.key}
                  </td>
                  <td className="py-4 px-6 text-textColor font-vintage text-base">{product.name}</td>
                  <td className="py-4 px-6 text-textColor font-vintage text-base">{product.price}</td>
                  <td className="py-4 px-6 capitalize">
                    <span className="px-3 py-1 rounded bg-accent text-primary font-vintage font-bold text-sm">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-textColor font-vintage text-sm">
                    {product.dimensions}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded font-vintage font-bold text-sm ${
                        product.availability ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      }`}
                    >
                      {product.availability ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-center gap-3">

                    <button
                      onClick={() => {navigate(`/admin/items/edit` , {state: product})}}
                      className="vintage-button bg-accent hover:bg-highlight text-primary px-4 py-2 rounded-md transition flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.key)}
                      className="vintage-button bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Link to="/admin/items/add">
        <IoAddCircleOutline className="text-[60px] text-accent hover:text-highlight transition absolute right-6 bottom-6 cursor-pointer drop-shadow-lg" />
      </Link>
    </div>
  );
}
