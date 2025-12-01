import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function BookingItem({ itemKey, qty, refresh }) {
	const [item, setItem] = useState(null);
	const [status, setStatus] = useState("loading"); // loading, success, error

	useEffect(() => {
		if (status === "loading") {
			axios
				.get(`${backendUrl}/api/products/${itemKey}`)
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
				className="w-20 h-20 object-cover rounded-lg border-2 border-border shadow-vintage flex-shrink-0"
			/>

			{/* Product Details */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2 min-w-0">
				<h3 className="text-base sm:text-lg font-semibold font-classic text-textColor truncate pr-2 flex-shrink">{item.name}</h3>
				<div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
					<p className="font-medium font-vintage w-[70px] text-center text-highlight text-sm sm:text-base">
						Rs. {item.price?.toFixed(2)}
					</p>
					<p className="font-medium font-vintage w-[40px] text-center text-textColor relative flex justify-center items-center text-sm sm:text-base">
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
					<p className="text-base sm:text-lg font-bold font-vintage text-accent w-[90px] text-right">
						Rs. {((item.price || 0) * qty).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}
