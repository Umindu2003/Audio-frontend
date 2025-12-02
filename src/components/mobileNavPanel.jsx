import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();
	const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

	function goTo(route) {
		navigate(route);
		setOpen(false);
	}

	return (
		<>
			{isOpen && (
				<div className="w-full h-screen bg-[#00000080] fixed top-0 left-0 z-50">
					<div className="h-full bg-secondary w-[300px] shadow-vintage-xl border-r-4 border-border">
						{/* Header */}
						<div className="bg-interactive w-full h-[70px] flex relative justify-center items-center border-b-4 border-border">
							<img
								src="/logo.png"
								alt="logo"
								className="w-[60px] h-[60px] object-cover border-4 border-accent absolute left-1 rounded-full shadow-vintage"
							/>
							<IoMdClose
								className="absolute right-3 text-3xl text-textColor hover:text-highlight cursor-pointer transition-all duration-300"
								onClick={() => {
									setOpen(false);
								}}
							/>
						</div>

						{/* Navigation Links */}
						<div
							onClick={() => {
								goTo("/");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<CiHome className="text-2xl" />
							Home
						</div>
                        <div
							onClick={() => {
								goTo("/items");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<CiSpeaker className="text-2xl" />
							Items
						</div>

						<div
							onClick={() => {
								goTo("/gallery");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<MdPhotoLibrary className="text-2xl" />
							Gallery
						</div>                        

						{token != null && (
							<div
								onClick={() => {
									goTo("/booking");
								}}
								className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
							>
								<FaRegCalendarCheck className="text-2xl" />
								Booking
							</div>
						)}

						<div
							onClick={() => {
								goTo("/contacts");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<MdContacts className="text-2xl" />
							Contact
						</div>

						

						{/* Authentication Buttons */}
						{token != null ? (
							<div
								onClick={() => {
									localStorage.removeItem("token");
									window.location.href = "/login";
								}}
								className="text-[20px] font-serif-vintage text-accent m-1 p-3 mt-4 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-2 border-accent"
							>
								Logout
							</div>
						) : (
							<div className="mt-4 px-2 flex flex-col gap-2">
								<div
									onClick={() => {
										goTo("/login");
									}}
									className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center justify-center cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-2 border-accent bg-primary"
								>
									Login
								</div>
								<div
									onClick={() => {
										goTo("/register");
									}}
									className="text-[20px] font-serif-vintage text-accent m-1 p-3 flex items-center justify-center cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-2 border-accent"
								>
									Register
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
