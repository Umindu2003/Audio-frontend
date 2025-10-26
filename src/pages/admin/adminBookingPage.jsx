import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeOrder, setActiveOrder] = useState(null);
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`http://localhost:3000/api/orders/`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(res.data);
				setOrders(res.data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			} finally {
				setLoading(false);
			}
		};
		if (loading) {
			fetchOrders();
		}
	}, [loading]);

	function handleOrderStatusChange(orderId, status) {
        const token = localStorage.getItem("token");
        
        axios.put(
            `http://localhost:3000/api/orders/status/${orderId}`,
            {
                status: status,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(()=>{
            console.log("Order status updated");
            setModalOpened(false);
            setLoading(true);
        }).catch((err)=>{
            console.error(err);
            setLoading(true);
        })
    }

	return (
		<div className="p-6 bg-primary min-h-screen">
			<h1 className="text-4xl font-serif-vintage text-textColor mb-8 border-b-4 border-accent pb-4">Admin Orders</h1>
			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="border-4 bg-0 border-b-accent rounded-full animate-spin w-[100px] h-[100px]"></div>
				</div>
			) : (
				<div className="overflow-x-auto rounded-lg shadow-vintage-lg">
					<table className="min-w-full bg-secondary border-2 border-border">
						<thead className="bg-interactive border-b-4 border-border">
							<tr>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Order ID</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Email</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Days</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Starting Date</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Ending Date</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Total Amount</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Approval Status</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Order Date</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order._id}
									className="border-b-2 border-border hover:bg-primary transition-colors duration-200 cursor-pointer"
									onClick={() => {
										setActiveOrder(order);
										setModalOpened(true);
									}}
								>
									<td className="px-6 py-4 text-textColor font-vintage font-bold text-base">{order.orderId}</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">{order.email}</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">{order.days}</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">
										{new Date(order.startingDate).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">
										{new Date(order.endingDate).toLocaleDateString()}
									</td>
									<td className="px-6 py-4 text-textColor font-vintage font-bold text-base">LKR {order.totalAmount.toFixed(2)}</td>
									<td className="px-6 py-4">
										<span className={`px-3 py-1 rounded font-vintage font-bold text-sm ${
											order.status === "approved" ? "bg-green-600 text-white" :
											order.status === "Rejected" ? "bg-red-600 text-white" :
											"bg-yellow-600 text-white"
										}`}>
											{order.status}
										</span>
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">
										{new Date(order.orderDate).toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{modalOpened && (
				<div className="fixed top-0 left-0 w-full h-full bg-[#00000090] flex justify-center items-center z-50">
					<div className="w-[600px] max-h-[90vh] overflow-auto vintage-card bg-secondary p-6 rounded-lg shadow-vintage-xl relative border-4 border-border">
						<IoMdCloseCircleOutline
							className="absolute top-4 right-4 text-4xl cursor-pointer text-textColor hover:text-red-600 transition-colors"
							onClick={() => setModalOpened(false)}
						/>
						<h1 className="text-3xl font-serif-vintage text-textColor mb-6 border-b-2 border-accent pb-3">Order Details</h1>
						<div className="flex flex-col gap-3 mb-6">
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Order ID:</span>{" "}
								{activeOrder.orderId}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Email:</span>{" "}
								{activeOrder.email}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Days:</span> {activeOrder.days}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Starting Date:</span>{" "}
								{new Date(activeOrder.startingDate).toLocaleDateString()}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Ending Date:</span>{" "}
								{new Date(activeOrder.endingDate).toLocaleDateString()}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Total Amount:</span>{" "}
								LKR {activeOrder.totalAmount.toFixed(2)}
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Approval Status:</span>{" "}
								<span className={`px-3 py-1 rounded font-bold text-sm ml-2 ${
									activeOrder.status === "approved" ? "bg-green-600 text-white" :
									activeOrder.status === "Rejected" ? "bg-red-600 text-white" :
									"bg-yellow-600 text-white"
								}`}>
									{activeOrder.status}
								</span>
							</p>
							<p className="text-textColor font-vintage text-base">
								<span className="font-bold text-accent">Order Date:</span>{" "}
								{new Date(activeOrder.orderDate).toLocaleDateString()}
							</p>
						</div>
						<div className="my-6 w-full flex justify-start items-center gap-4">
							<button onClick={()=>{
                                handleOrderStatusChange(activeOrder.orderId, "approved")
                            }} className="vintage-button bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-vintage font-bold">
								Approve
							</button>
							<button onClick={()=>{
                                handleOrderStatusChange(activeOrder.orderId, "Rejected")
                            }} className="vintage-button bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-vintage font-bold">
								Reject
							</button>
						</div>
						<h2 className="text-2xl font-serif-vintage text-textColor mb-4 border-b-2 border-accent pb-2">Ordered Items</h2>
						<table className="w-full bg-primary border-2 border-border rounded-lg overflow-hidden">
							<thead className="bg-interactive border-b-2 border-border">
								<tr>
									<th className="px-4 py-3 text-left text-textColor font-serif-vintage">Image</th>
									<th className="px-4 py-3 text-left text-textColor font-serif-vintage">Product</th>
									<th className="px-4 py-3 text-left text-textColor font-serif-vintage">Qty</th>
									<th className="px-4 py-3 text-left text-textColor font-serif-vintage">Price</th>
								</tr>
							</thead>
							<tbody>
								{activeOrder.orderedItems.map((item) => {
									return (
										<tr key={item.product.key} className="border-b border-border hover:bg-secondary transition-colors">
											<td className="px-4 py-3">
												<img
													src={item.product.image}
													alt={item.product.name}
													className="w-16 h-16 object-cover rounded border-2 border-accent"
												/>
											</td>
											<td className="px-4 py-3 text-textColor font-vintage">{item.product.name}</td>
											<td className="px-4 py-3 text-textColor font-vintage font-bold">{item.quantity}</td>
											<td className="px-4 py-3 text-textColor font-vintage font-bold">LKR {item.product.price}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</div>
	);
}