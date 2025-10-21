import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Items() {
  const [state, setState] = useState("loading"); // "loading", "loaded", "error"
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (state === "loading"){
      axios.get("http://localhost:3000/api/products")
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
        setState("loaded");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || "Failed to load items");
        setState("error");
      });
    }
    
  }, []);

  return (
    <div className="w-full h-full flex flex-wrap justify-center pt-[50px]">
      {state === "loading" && <div className="w-full h-full flex justify-center items-center"><div className="w-[50px] h-[50px] border-4 rounded-full border-t-green-500 animate-spin"></div></div>}
      {state === "loaded" && items.map((item) => (
          <h1 key = {item.key}>{item.name}</h1>
      ))}
    </div>
  );
}

