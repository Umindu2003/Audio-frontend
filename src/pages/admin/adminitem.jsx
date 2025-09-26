const sampleARR = [
  {
    key: "AUDIO001",
    name: "Wireless Bluetooth Speaker",
    price: 7500,
    category: "audio",
    dimensions: "10 x 10 x 15 cm",
    description: "Portable wireless Bluetooth speaker with deep bass and 12-hour battery life.",
    availability: true,
    image: ["https://images.unsplash.com/photo-1583225151715-3e6d1b3c89f8"]
  },
  {
    key: "LIGHTS001",
    name: "Smart LED Bulb",
    price: 1200,
    category: "lights",
    dimensions: "6 x 6 x 12 cm",
    description: "Energy-efficient smart LED bulb with WiFi control and RGB color support.",
    availability: true,
    image: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"]
  },
  {
    key: "AUDIO002",
    name: "Noise Cancelling Headphones",
    price: 18500,
    category: "audio",
    dimensions: "18 x 15 x 8 cm",
    description: "Over-ear headphones with active noise cancellation and crystal-clear sound.",
    availability: true,
    image: ["https://images.unsplash.com/photo-1518444020930-30c1d46e1d40"]
  },
  {
    key: "LIGHTS002",
    name: "Stage Lighting Set",
    price: 48000,
    category: "lights",
    dimensions: "40 x 25 x 25 cm",
    description: "Professional stage lighting kit with adjustable brightness and remote control.",
    availability: false,
    image: ["https://images.unsplash.com/photo-1588776814546-3e6c22222f5e"]
  }
];
// sampleARR is not used in this file but can be used for testing purposes.

import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";


export default function AdminItems() {

const [items, setItems] = useState(sampleARR); // For testing, using sampleARR as initial state.

  return (
    <div className="w-full h-full relative">
        <table>
          <thead>
            <th> Key </th>
            <th> Name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Dimensions </th>
            <th> Availability </th>
            
          </thead>
          <tbody>
            {
              items.map((product) => {
                console.log(product);
                return (
                  <tr key={product.key}>
                    <td> {product.key} </td>
                    <td> {product.name} </td>
                    <td> {product.price} </td>
                    <td> {product.category} </td>
                    <td> {product.dimensions} </td>
                    <td> {product.availability ? "In Stock" : "Out of Stock"} </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        <Link to="/admin/items/add">
          <IoAddCircleOutline className="text-[50px] absolute right-2 bottom-2 hover:text-red-700 r" />
        </Link>
      </div>
  );
}
