import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPanel from "./mobileNavPanel";


export default function Header() {

  const [navPanelOpen, setNavPanelOpen] = useState(false);

  return (
    <header className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent">
      <img src="/logo.png" alt="logo" className="h-[60px] w-[60px] object-cover border-[3px] absolute left-1 rounded-full"/>
        <div className="hidden w-[450px]  md:flex justify-evenly items-center">
        <Link to= "/" className="hidden md:block text-[25px]  m-1"> Home </Link>
        <Link to= "/contacts" className="hidden md:block text-[25px]  m-1"> Contacts </Link>
        <Link to= "/gallery" className="hidden md:block text-[25px]  m-1"> Gallery </Link>
        <Link to= "/items" className="hidden md:block text-[25px]  m-1"> Items </Link>
        <Link
					to="/booking"
					className="hidden md:block text-[22px]  m-1 absolute right-24"
				>
					<FaCartShopping />
				</Link>
        </div>
        <GiHamburgerMenu
				className="absolute right-5 text-[24px] md:hidden"
				onClick={() => {
					setNavPanelOpen(true);
				}}
			/>

      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />

    </header>
  );
}
