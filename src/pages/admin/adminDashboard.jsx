import axios from "axios";
import { useEffect, useState } from "react";
import { FaUsers, FaBoxOpen, FaCheckCircle, FaTimesCircle, FaShoppingCart } from "react-icons/fa";
import { MdPending } from "react-icons/md";

export default function AdminDashboard() {
	const [stats, setStats] = useState({
		totalUsers: 0,
		totalProducts: 0,
		totalOrders: 0,
		inStock: 0,
		outOfStock: 0,
		pendingOrders: 0,
		approvedOrders: 0,
		rejectedOrders: 0,
		totalRevenue: 0,
	});
	const [loading, setLoading] = useState(true);
	const [recentOrders, setRecentOrders] = useState([]);
	const [recentUsers, setRecentUsers] = useState([]);

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const token = localStorage.getItem("token");

				// Fetch all data in parallel
				const [usersRes, productsRes, ordersRes] = await Promise.all([
					axios.get(`http://localhost:3000/api/users/all`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
					axios.get(`http://localhost:3000/api/products`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
					axios.get(`http://localhost:3000/api/orders/`, {
						headers: { Authorization: `Bearer ${token}` },
					}),
				]);

				const users = usersRes.data;
				const products = productsRes.data;
				const orders = ordersRes.data;

				// Calculate statistics
				const inStock = products.filter((p) => p.availability).length;
				const outOfStock = products.filter((p) => !p.availability).length;
				const pendingOrders = orders.filter((o) => o.status === "pending").length;
				const approvedOrders = orders.filter((o) => o.status === "approved").length;
				const rejectedOrders = orders.filter((o) => o.status === "Rejected").length;
				const totalRevenue = orders
					.filter((o) => o.status === "approved")
					.reduce((sum, order) => sum + order.totalAmount, 0);

				setStats({
					totalUsers: users.length,
					totalProducts: products.length,
					totalOrders: orders.length,
					inStock,
					outOfStock,
					pendingOrders,
					approvedOrders,
					rejectedOrders,
					totalRevenue,
				});

				// Get recent orders (last 5)
				const sortedOrders = orders
					.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
					.slice(0, 5);
				setRecentOrders(sortedOrders);

				// Get recent users (last 5)
				const sortedUsers = users
					.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
					.slice(0, 5);
				setRecentUsers(sortedUsers);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		if (loading) {
			fetchDashboardData();
		}
	}, [loading]);

	const StatCard = ({ icon: Icon, title, value, bgColor, iconColor }) => (
		<div className={`${bgColor} rounded-lg shadow-vintage p-6 border-2 border-border`}>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-textColor/80 text-sm font-serif-vintage mb-1">{title}</p>
					<p className="text-3xl font-bold text-textColor">{value}</p>
				</div>
				<Icon className={`text-5xl ${iconColor}`} />
			</div>
		</div>
	);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-full">
				<div className="border-4 bg-0 border-b-accent rounded-full animate-spin w-[100px] h-[100px]"></div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-primary min-h-screen">
			<h1 className="text-4xl font-serif-vintage text-textColor mb-8 border-b-4 border-accent pb-4">
				Admin Dashboard
			</h1>

			{/* Statistics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatCard
					icon={FaUsers}
					title="Total Users"
					value={stats.totalUsers}
					bgColor="bg-secondary"
					iconColor="text-accent"
				/>
				<StatCard
					icon={FaBoxOpen}
					title="Total Products"
					value={stats.totalProducts}
					bgColor="bg-secondary"
					iconColor="text-highlight"
				/>
				<StatCard
					icon={FaShoppingCart}
					title="Total Orders"
					value={stats.totalOrders}
					bgColor="bg-secondary"
					iconColor="text-interactive"
				/>
				<StatCard
					icon={FaCheckCircle}
					title="Total Revenue"
					value={`LKR ${stats.totalRevenue.toFixed(2)}`}
					bgColor="bg-secondary"
					iconColor="text-green-600"
				/>
			</div>

			{/* Inventory & Order Status */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
				{/* Inventory Status */}
				<div className="vintage-card p-6">
					<h2 className="text-2xl font-serif-vintage text-textColor mb-4 border-b-2 border-border pb-2">
						Inventory Status
					</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
							<div className="flex items-center gap-3">
								<FaCheckCircle className="text-3xl text-green-600" />
								<span className="text-lg text-textColor font-serif-vintage">In Stock</span>
							</div>
							<span className="text-2xl font-bold text-textColor">{stats.inStock}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
							<div className="flex items-center gap-3">
								<FaTimesCircle className="text-3xl text-red-600" />
								<span className="text-lg text-textColor font-serif-vintage">Out of Stock</span>
							</div>
							<span className="text-2xl font-bold text-textColor">{stats.outOfStock}</span>
						</div>
					</div>
				</div>

				{/* Order Status */}
				<div className="vintage-card p-6">
					<h2 className="text-2xl font-serif-vintage text-textColor mb-4 border-b-2 border-border pb-2">
						Order Status
					</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
							<div className="flex items-center gap-3">
								<MdPending className="text-3xl text-yellow-600" />
								<span className="text-lg text-textColor font-serif-vintage">Pending</span>
							</div>
							<span className="text-2xl font-bold text-textColor">{stats.pendingOrders}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
							<div className="flex items-center gap-3">
								<FaCheckCircle className="text-3xl text-green-600" />
								<span className="text-lg text-textColor font-serif-vintage">Approved</span>
							</div>
							<span className="text-2xl font-bold text-textColor">{stats.approvedOrders}</span>
						</div>
						<div className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border">
							<div className="flex items-center gap-3">
								<FaTimesCircle className="text-3xl text-red-600" />
								<span className="text-lg text-textColor font-serif-vintage">Rejected</span>
							</div>
							<span className="text-2xl font-bold text-textColor">{stats.rejectedOrders}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Orders & Users */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Recent Orders */}
				<div className="vintage-card p-6">
					<h2 className="text-2xl font-serif-vintage text-textColor mb-4 border-b-2 border-border pb-2">
						Recent Orders
					</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-secondary border-b-2 border-border">
								<tr>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Order ID</th>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Status</th>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Amount</th>
								</tr>
							</thead>
							<tbody>
								{recentOrders.map((order) => (
									<tr key={order._id} className="border-b border-border hover:bg-secondary/50">
										<td className="px-4 py-2 text-textColor font-vintage">{order.orderId}</td>
										<td className="px-4 py-2">
											<span
												className={`px-2 py-1 rounded text-xs font-vintage ${
													order.status === "approved"
														? "bg-green-600 text-white"
														: order.status === "Rejected"
														? "bg-red-600 text-white"
														: "bg-yellow-600 text-white"
												}`}
											>
												{order.status}
											</span>
										</td>
										<td className="px-4 py-2 text-textColor font-vintage">
											LKR {order.totalAmount.toFixed(2)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Recent Users */}
				<div className="vintage-card p-6">
					<h2 className="text-2xl font-serif-vintage text-textColor mb-4 border-b-2 border-border pb-2">
						Recent Users
					</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-secondary border-b-2 border-border">
								<tr>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Name</th>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Email</th>
									<th className="px-4 py-2 text-left text-textColor font-serif-vintage">Role</th>
								</tr>
							</thead>
							<tbody>
								{recentUsers.map((user) => (
									<tr key={user._id} className="border-b border-border hover:bg-secondary/50">
										<td className="px-4 py-2 text-textColor font-vintage">
											{user.firstName} {user.lastName}
										</td>
										<td className="px-4 py-2 text-textColor font-vintage text-sm">
											{user.email}
										</td>
										<td className="px-4 py-2">
											<span className="px-2 py-1 rounded text-xs font-vintage bg-interactive text-textColor">
												{user.role}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
