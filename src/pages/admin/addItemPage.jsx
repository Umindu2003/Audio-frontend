import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimensions, setProductDimensions] = useState("");
  const [productDescription, setProductDescription] = useState("");
	const [productImages, setProductImages] = useState([]);

  const navigate = useNavigate();

  async function handleAddItem() {

    const promises = [];


    for (let i = 0; i < productImages.length; i++) {
			console.log(productImages[i]);
			const promise = mediaUpload(productImages[i]);
			promises.push(promise);
			// if(i ==5){
			// 	toast.error("You can only upload 25 images at a time");
			// 	break;
			// }
		}


    console.log(
      productKey,
      productName,
      productPrice,
      productCategory,
      productDimensions,
      productDescription
    );

    const token = localStorage.getItem("token");
    console.log("Token:", token ? "Exists" : "Missing");
    
    if(token) {
      try {
        const imageUrls = await Promise.all(promises);
        console.log("Uploaded image URLs:", imageUrls);

        const result = await axios.post("http://localhost:3000/api/products", {
          key : productKey,
          name : productName,
          price : productPrice,
          category : productCategory,
          dimensions : productDimensions,
          description : productDescription,
          image : imageUrls
        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        toast.success(result.data.message);
        navigate("/admin/items");

        } catch (err) {
        toast.error(err.response?.data?.error || err.response?.data?.message || "Error adding item. Please try again.");
        console.error(err);
        return;
      }
    } else {
        toast.error("You must be logged in to add an item.");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Add New Item</h1>
      <div className="w-[400px] border rounded-xl shadow p-4 flex flex-col gap-3">
        <input
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
        <input
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          type="text"
          placeholder="Product Description"
          className="border p-2 rounded"
        />
        <input
					type="file"
					multiple
					onChange={(e) => {
						setProductImages(e.target.files);
					}}
					className="w-full p-2 border rounded"
				/>



        
        <button onClick={handleAddItem} className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Add
        </button>

        <button onClick={() => {navigate("/admin/items")}} className="bg-red-500 text-white py-2 rounded hover:bg-red-600">
          Cancel
        </button>

      </div>
    </div>
  );
}
