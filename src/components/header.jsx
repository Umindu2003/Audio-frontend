import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPanel from "./mobileNavPanel";


export default function Header() {

  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <header className="w-full h-[85px] shadow-vintage-lg flex justify-center items-center relative bg-interactive border-b-4 border-border">
      <img src="/logo.png" alt="logo" className="h-[85px] w-[85px] absolute left-1 rounded-full border-4 border-accent shadow-vintage"/>
        <div className="hidden w-[450px] md:flex justify-evenly items-center">
        <Link to= "/" className="hidden md:block text-[22px] font-classic text-textColor hover:text-highlight hover:scale-110 transition-all duration-300 m-1"> Home </Link>
        <Link to= "/contacts" className="hidden md:block text-[22px] font-classic text-textColor hover:text-highlight hover:scale-110 transition-all duration-300 m-1"> Contacts </Link>
        <Link to= "/gallery" className="hidden md:block text-[22px] font-classic text-textColor hover:text-highlight hover:scale-110 transition-all duration-300 m-1"> Gallery </Link>
        <Link to= "/items" className="hidden md:block text-[22px] font-classic text-textColor hover:text-highlight hover:scale-110 transition-all duration-300 m-1"> Items </Link>
        <Link
					to="/booking"
          className="hidden md:block text-[22px] text-textColor hover:text-highlight hover:scale-125 transition-all duration-300 m-1 absolute right-40"
				>
					<FaCartShopping />
				</Link>
        </div>
        <GiHamburgerMenu
				className="absolute right-5 text-[24px] text-textColor hover:text-highlight cursor-pointer transition-all duration-300 md:hidden"
				onClick={() => {
					setNavPanelOpen(true);
				}}
			/>

       {token != null && (
        <button className="hidden md:block absolute right-5 text-[18px] font-serif-vintage text-accent hover:text-highlight hover:scale-110 transition-all duration-300 border-2 border-accent hover:border-highlight px-3 py-1 rounded-md shadow-vintage" onClick={()=>{
        localStorage.removeItem("token")
        window.location.href = "/login"
      }}>
        Logout
      </button>
       )}


      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

    </header>
  );
}
