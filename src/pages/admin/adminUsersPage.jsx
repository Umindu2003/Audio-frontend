import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await axios.get(
					`http://localhost:3000/api/users/all`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(res.data);
				setUsers(res.data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};
        if(loading){
            fetchUsers();
        }
	}, [loading]);

    function handleBlockUser(email){
    
        const token = localStorage.getItem("token");

        axios.put(`http://localhost:3000/api/users/block/${email}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(()=>{
            setLoading(true);
        }).catch((err)=>{
            console.error(err);
        })
    }

	return (
		<div className="p-6 bg-primary min-h-screen">
			<h1 className="text-4xl font-serif-vintage text-textColor mb-8 border-b-4 border-accent pb-4">Admin Users</h1>
			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="border-4 bg-0 border-b-accent rounded-full animate-spin w-[100px] h-[100px]"></div>
				</div>
			) : (
				<div className="overflow-x-auto rounded-lg shadow-vintage-lg">
					<table className="min-w-full bg-secondary border-2 border-border">
						<thead className="bg-interactive border-b-4 border-border">
							<tr>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Profile</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Name</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Email</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Role</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Phone</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Address</th>
								<th className="px-6 py-4 text-left text-textColor font-serif-vintage text-lg">Status</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id} className="border-b-2 border-border hover:bg-primary transition-colors duration-200">
									<td className="px-6 py-4">
										<img
											src={
												user.profilePicture || "https://via.placeholder.com/50"
											}
											alt="Profile"
											className="w-12 h-12 rounded-full border-2 border-accent"
										/>
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">
										{user.firstName} {user.lastName}
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">{user.email}</td>
									<td className="px-6 py-4 capitalize">
										<span className="px-3 py-1 rounded bg-accent text-primary font-vintage font-bold text-sm">
											{user.role}
										</span>
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">
										{user.phone || user.phoneNumber || "N/A"}
									</td>
									<td className="px-6 py-4 text-textColor font-vintage text-base">{user.address || "N/A"}</td>
									<td onClick={()=>{handleBlockUser(user.email)}} className="px-6 py-4 cursor-pointer">
										<span className={`px-3 py-1 rounded font-vintage font-bold text-sm ${user.isBlocked ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
											{user.isBlocked ? "BLOCKED" : "ACTIVE"}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}