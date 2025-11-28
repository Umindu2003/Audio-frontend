import { useEffect, useMemo, useState } from "react";
import { loadCart, formatDate } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage(){
    const [cart, setCart] = useState(loadCart());
    const [total , setTotal] = useState(0);
    // Dates removed in UI; keep rental days defaulting to 1, but provide dates to backend if required
    const daysBetween = 1;
    const { startingDate, endingDate } = useMemo(() => {
        const start = new Date();
        // If daysBetween is 1, end is same as start
        const end = new Date(start.getTime() + (daysBetween - 1) * 24 * 60 * 60 * 1000);
        return { startingDate: formatDate(start), endingDate: formatDate(end) };
    }, [daysBetween]);
    const totalOrders = cart.orderedItems.reduce((sum, item) => sum + (item.qty || 0), 0);

    function reloadCart(){
        setCart(loadCart());
        calculateTotal();
        
    }
    function calculateTotal(){
        const baseCart = loadCart();
        const cartInfo = { ...baseCart, days: daysBetween, startingDate, endingDate };
        axios.post(`http://localhost:3000/api/orders/quote`, cartInfo)
        .then((res)=>{
            console.log(res.data)
            setTotal(res.data.total);
        }).catch((err)=>{   
            console.error("Quote error", err?.response?.data || err.message);
        })
    }

    useEffect(()=>{
        calculateTotal();
    },[])
    
    function handleBookingCreation(){
        const baseCart = loadCart();
        const payload = { ...baseCart, days: daysBetween, startingDate, endingDate };

        const token = localStorage.getItem("token");
        axios.post(`http://localhost:3000/api/orders`, payload, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res)=>{
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Created");
            setCart(loadCart());
        }).catch((err)=>{
            console.error("Create booking error", err?.response?.data || err.message);
            toast.error("Failed to create booking");
        })
    }

    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-primary py-8 px-4">
            <h1 className="text-4xl font-bold font-classic text-accent mb-8 border-b-4 border-accent pb-3 shadow-vintage">Create Booking</h1>
            <div className="w-full flex flex-col items-center gap-6 mt-4 vintage-card max-w-md p-6">
                <p className="text-textColor font-medium font-vintage text-lg bg-interactive bg-opacity-30 px-6 py-2 rounded-md border border-border w-full text-center">
                    Total Orders: <span className="text-highlight font-bold">{totalOrders}</span>
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