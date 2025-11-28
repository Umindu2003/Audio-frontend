import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading"); // loading, success, error

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`http://localhost:3000/api/products/${itemKey}`)
				.then((res) => {
					// Check if response is an array and find the product with matching key
					let productData = res.data;
					if (Array.isArray(res.data)) {
						productData = res.data.find(p => p.key === itemKey);
						if (!productData) {
							setStatus("error");
							removeFromCart(itemKey);
							refresh();
							return;
						}
					}
					setItem(productData);
					setStatus("success");
				})
				.catch((err) => {
					console.error(err);
					setStatus("error");
					removeFromCart(itemKey);
					refresh();
				});
		}
	}, [status, itemKey, refresh]);

	if (status === "loading") {
		return <div className="text-accent font-vintage">Loading...</div>;
	}

	if (status === "error") {
		return <div className="text-highlight font-vintage">Failed to load product.</div>;
	}

	return (
		<div className="flex w-full max-w-3xl my-3 items-center gap-4 p-4 vintage-card relative">
            <div className="absolute right-[-45px] text-textColor hover:text-highlight hover:bg-interactive p-[10px] rounded-full cursor-pointer transition-all duration-300 shadow-vintage">
            <FaTrash onClick={() => {
                removeFromCart(itemKey);
                refresh();
            }
            }/>
            </div>
			{/* Product Image */}
			<img
				src={item.image?.[0] || '/placeholder.png'}
				alt={item.name}
				className="w-20 h-20 object-cover rounded-lg border-2 border-border shadow-vintage"
			/>

			{/* Product Details */}
			<div className="flex flex-row items-center relative w-full">
				<h3 className="text-lg font-semibold font-classic text-textColor">{item.name}</h3>
				<div className="flex absolute right-0 gap-4">
					<p className="font-medium font-vintage w-[70px] text-center text-highlight">
						Rs. {item.price?.toFixed(2)}
					</p>
					<p className="font-medium font-vintage w-[40px] text-center text-textColor relative flex justify-center items-center">
						<button
							className="absolute top-[-20px] hover:text-highlight hover:scale-125 transition-all duration-200"
							onClick={() => {
								addToCart(itemKey, 1);
								refresh();
							}}
						>
							<FaArrowUp />
						</button>
						{qty}
						<button
							className="absolute bottom-[-20px] hover:text-highlight hover:scale-125 transition-all duration-200"
							onClick={() => {
								if (qty == 1) {
									removeFromCart(itemKey);
									refresh();
								} else {
									addToCart(itemKey, -1);
									refresh();
								}
							}}
						>
							<FaArrowDown />
						</button>
					</p>
					<p className="text-lg font-bold font-vintage text-accent">
						Rs. {((item.price || 0) * qty).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}
