import { CiHome, CiSpeaker } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdPhotoLibrary, MdContacts, MdInfoOutline } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MobileNavPanel(props) {
	const isOpen = props.isOpen;
	const setOpen = props.setOpen;
	const navigate = useNavigate();

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

						<div
							onClick={() => {
								goTo("/booking");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<FaRegCalendarCheck className="text-2xl" />
							Booking
						</div>

						<div
							onClick={() => {
								goTo("/contacts");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<MdContacts className="text-2xl" />
							Contact
						</div>

						<div
							onClick={() => {
								goTo("/about");
							}}
							className="text-[20px] font-serif-vintage text-textColor m-1 p-3 flex items-center gap-3 cursor-pointer hover:bg-interactive hover:text-highlight rounded-md transition-all duration-300 border-b border-border"
						>
							<MdInfoOutline className="text-2xl" />
							About
						</div>
					</div>
				</div>
			)}
		</>
	);
}
