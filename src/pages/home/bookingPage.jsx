import { useEffect, useState } from "react";
import { formatDate, loadCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());
    const [startingDate, setStartingDate] = useState(formatDate(new Date()));
    const [endingDate, setEndingDate] = useState(formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000)));
    const [total , setTotal] = useState(0);
    const daysBetween = Math.max((new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24), 1);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
        
    }
    function calculateTotal(){
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;
        cartInfo.endingDate = endingDate;
        cartInfo.days = daysBetween;
        axios.post(`http://localhost:3000/api/orders/quote`,
            cartInfo
        ).then((res)=>{
            console.log(res.data)
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error(err);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[startingDate, endingDate])
    
    function handleBookingCreation(){
        const cart = loadCart();
        cart.startingDate = startingDate;
        cart.endingDate = endingDate;
        cart.days = daysBetween;

        const token = localStorage.getItem("token");
        axios.post(`http://localhost:3000/api/orders`, cart, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error(err);
            toast.error("Failed to create booking");
        })
    }

    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-primary py-8 px-4">
            <h1 className="text-4xl font-bold font-classic text-accent mb-8 border-b-4 border-accent pb-3 shadow-vintage">Create Booking</h1>
            <div className="w-full flex flex-col items-center gap-6 mt-4 vintage-card max-w-md p-6">
                <label className="flex flex-col w-full">
                    <span className="text-accent font-semibold font-serif-vintage mb-2 text-lg">Starting Date:</span>
                    <input 
                        type="date" 
                        value={startingDate} 
                        onChange={(e) => setStartingDate(e.target.value)} 
                        className="vintage-input" 
                    />
                </label>
                <label className="flex flex-col w-full">
                    <span className="text-accent font-semibold font-serif-vintage mb-2 text-lg">Ending Date:</span>
                    <input 
                        type="date" 
                        value={endingDate} 
                        onChange={(e) => setEndingDate(e.target.value)} 
                        className="vintage-input" 
                    />
                </label>
                <p className="text-textColor font-medium font-vintage text-lg bg-interactive bg-opacity-30 px-6 py-2 rounded-md border border-border">
                    Total Days: <span className="text-highlight font-bold">{daysBetween}</span>
                </p>
            </div>
            <div className="w-full flex flex-col items-center mt-8">
                {
                    cart.orderedItems.map((item)=>{
                        return <BookingItem itemKey={item.key} key={item.key} qty={item.qty} refresh={reloadCart}/>
                    })
                }
            </div>
            <div className="w-full flex justify-center mt-8">
                <p className="text-3xl font-bold font-classic text-highlight bg-secondary px-8 py-4 rounded-lg border-2 border-accent shadow-vintage-lg">
                    Total: <span className="text-accent">Rs. {total.toFixed(2)}</span>
                </p>
            </div>
            <div className="w-full flex justify-center mt-8">
                <button className="vintage-button text-xl px-10 py-4" onClick={handleBookingCreation}>
                    Create Booking
                </button>
            </div>
        </div>
    )
}