import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ProductOverview() {
	const params = useParams();
	const navigate = useNavigate();
	const key = params.key;
	const [loadingStatus, setLoadingStatus] = useState("loading");
	const [product, setProduct] = useState({});
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	useEffect(() => {
		axios
			.get(`${backendUrl}/api/products/${key}`)
			.then((res) => {
				// Check if response is an array and find the product with matching key
				let productData = res.data;
				if (Array.isArray(res.data)) {
					productData = res.data.find(p => p.key === key);
					if (!productData) {
						setLoadingStatus("error");
						return;
					}
				}
				setProduct(productData);
				setLoadingStatus("loaded");
				console.log(productData);
			})
			.catch((err) => {
				console.error(err);
				setLoadingStatus("error");
			});
	}, [key]);
	return (
		<div className="w-full flex justify-center bg-primary min-h-screen py-8">
			{loadingStatus == "loading" && (
				<div className="w-full h-full flex justify-center items-center">
					<div className="w-[70px] h-[70px] border-b-4 border-b-accent animate-spin rounded-full"></div>
				</div>
			)}
			{loadingStatus == "loaded" && (
				<div className="w-full h-full flex flex-col md:flex-row justify-center items-start gap-6 px-4 max-w-7xl">
					<h1 className="text-3xl my-6 md:hidden font-bold font-classic text-accent text-center border-b-2 border-accent pb-2 w-full">{product.name}</h1>
                    <div className="w-full md:w-[49%] vintage-card p-4">
						<ImageSlider images={product.image} />
					</div>
					<div className="w-full md:w-[49%] vintage-card p-6 flex flex-col items-center">
						<h1 className="hidden md:block text-4xl font-bold font-classic text-accent border-b-2 border-accent pb-3 mb-4">{product.name}</h1>
					<h2 className="text-xl font-serif-vintage text-textColor bg-interactive bg-opacity-40 px-4 py-2 rounded-md border border-border shadow-vintage">
						{product.category} category
					</h2>
					<p className="text-textColor opacity-90 mt-6 text-center leading-relaxed text-lg">{product.description}</p>
					<p className="text-2xl font-bold mt-6 text-highlight font-vintage bg-primary bg-opacity-50 px-6 py-3 rounded-lg border-2 border-accent shadow-vintage">Rs. {product.price?.toFixed(2)}</p>
					<div className="mt-6 text-base text-textColor bg-interactive bg-opacity-30 px-4 py-2 rounded-md border border-border">
						<span className="font-semibold text-accent">Dimensions:</span>{" "}
						<span className="font-vintage">{product.dimensions}</span>
					</div>
						<button
							className="vintage-button mt-8 text-lg px-8 py-3"
							onClick={() => {
								if (!token) {
									toast.error("Please login to add items to cart");
									navigate("/login");
									return;
								}
								addToCart(product.key, 1);
								toast.success("Added to Cart");
								console.log(loadCart());
							}}
						>
							Add to Cart
						</button>
					</div>
				</div>
			)}
			{loadingStatus == "error" && (
				<div className="w-full h-full flex justify-center items-center">
					<h1 className="text-3xl font-bold font-classic text-accent bg-secondary px-8 py-4 rounded-lg border-2 border-border shadow-vintage">Error Occurred</h1>
				</div>
			)}
		</div>
	);
}
