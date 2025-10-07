import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateItemPage() {
  const location = useLocation();
  console.log(location);

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);

  
  const navigate = useNavigate();
  

  async function handleAddItem() {
    console.log({
      productKey,
      productName,
      productPrice,
      productCategory,
      productDimensions,
      productDescription
    });

    const token = localStorage.getItem("token");
    if(token) {
      try {
        const result = await axios.put(`http://localhost:3000/api/products/${productKey}`, {
          key : productKey,
          name : productName,
          price : productPrice,
          category : productCategory,
          dimensions : productDimensions,
          description : productDescription
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        toast.success(result.data.message);
        navigate("/admin/items");

        } catch (err) {
        toast.error("Error adding item. Please try again.");
        console.error(err);
        return;
      }
    } else {
        toast.error("You must be logged in to add an item.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Update Item</h1>
      <div className="w-[400px] border rounded-xl shadow p-4 flex flex-col gap-3">
        <input
        disabled
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          type="text"
          placeholder="Product Key"
          className="border p-2 rounded"
        />
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded"
        />
        <input
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          type="number"
          placeholder="Product Price"
          className="border p-2 rounded"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          value={productDimensions}
          onChange={(e) => setProductDimensions(e.target.value)}
          type="text"
          placeholder="Product Dimensions"
          className="border p-2 rounded"
        />
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          type="text"
          placeholder="Product Description"
          className="border p-2 rounded"
        />
        <button onClick={handleAddItem} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Update Item
        </button>

        <button onClick={() => {navigate("/admin/items")}} className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Cancel
        </button>

      </div>
    </div>
  );
}
