import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function UpdateItemPage() {
  const location = useLocation();
  console.log(location);

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(location.state.category);
  const [productDimensions, setProductDimensions] = useState(location.state.dimensions);
  const [productDescription, setProductDescription] = useState(location.state.description);
	const [productImages, setProductImages] = useState([]);

  
  const navigate = useNavigate();
  

  async function handleUpdateItem() {

 		let updatingImages = location.state.image

		if (productImages.length > 0) {
			const promises = [];

			for (let i = 0; i < productImages.length; i++) {
				console.log(productImages[i]);
				const promise = mediaUpload(productImages[i]);
				promises.push(promise);
			}

			updatingImages = await Promise.all(promises);
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
        console.log("Updated image URLs:", updatingImages);
        
        const result = await axios.put(`${backendUrl}/api/products/${productKey}`, {
          key : productKey,
          name : productName,
          price : productPrice,
          category : productCategory,
          dimensions : productDimensions,
          description : productDescription,
          image : updatingImages

        }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        toast.success(result.data.message);
        navigate("/admin/items");

        } catch (err) {
        toast.error(err.response?.data?.error || err.response?.data?.message || "Error updating item. Please try again.");
        console.error(err);
        return;
      }
    } else {
        toast.error("You must be logged in to update an item.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center p-8">
      <h1 className="text-4xl font-serif-vintage text-textColor mb-8 border-b-4 border-accent pb-4">Update Item</h1>
      <div className="w-[500px] vintage-card bg-secondary p-8 rounded-lg shadow-vintage-lg border-4 border-border flex flex-col gap-4">
        <input
        disabled
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          type="text"
          placeholder="Product Key"
          className="vintage-input w-full p-3 border-2 border-border rounded bg-interactive text-textColor/60 font-vintage cursor-not-allowed"
        />
        <input
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          placeholder="Product Name"
          className="vintage-input w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage placeholder-textColor/50 focus:border-accent focus:outline-none"
        />
        <input
          value={productPrice}
          onChange={(e) => setProductPrice(Number(e.target.value))}
          type="number"
          placeholder="Product Price (LKR)"
          className="vintage-input w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage placeholder-textColor/50 focus:border-accent focus:outline-none"
        />
        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="vintage-input w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage focus:border-accent focus:outline-none"
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          value={productDimensions}
          onChange={(e) => setProductDimensions(e.target.value)}
          type="text"
          placeholder="Product Dimensions (e.g., 18 x 20 x 45 cm)"
          className="vintage-input w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage placeholder-textColor/50 focus:border-accent focus:outline-none"
        />
        <textarea
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Product Description"
          rows="4"
          className="vintage-input w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage placeholder-textColor/50 focus:border-accent focus:outline-none resize-none"
        />

        <div className="flex flex-col gap-2">
          <label className="text-textColor font-serif-vintage text-sm">Upload New Images (Optional)</label>
          <input
					type="file"
					multiple
					onChange={(e) => {
						setProductImages(e.target.files);
					}}
					className="w-full p-3 border-2 border-border rounded bg-primary text-textColor font-vintage file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-vintage file:bg-accent file:text-primary hover:file:bg-highlight file:cursor-pointer"
				/>
        </div>

        <button onClick={handleUpdateItem} className="vintage-button w-full bg-accent hover:bg-highlight text-primary py-3 rounded-md font-serif-vintage font-bold text-lg transition-all duration-300 mt-4">
          Update Item
        </button>

        <button onClick={() => {navigate("/admin/items")}} className="vintage-button w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md font-serif-vintage font-bold text-lg transition-all duration-300">
          Cancel
        </button>

      </div>
    </div>
  );
}
