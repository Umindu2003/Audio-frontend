import { Link } from "react-router-dom";


export default function Header() {
  return (
    <header className="w-full h-[100px] shadow-xl">
        <Link to= "/" className="text-[25px] font-bold "> Home </Link>
        <Link to= "/contacts" className="text-[25px] font-bold "> Contacts </Link>
        <Link to= "/gallery" className="text-[25px] font-bold "> Gallery </Link>
        <Link to= "/items" className="text-[25px] font-bold "> Items </Link>
    </header>
  );
}
