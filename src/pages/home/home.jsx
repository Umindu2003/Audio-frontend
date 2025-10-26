import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productCard";
import { FaRecordVinyl, FaTruck, FaHeadphonesAlt, FaTags } from "react-icons/fa";

function LogoBadge() {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72">
      {/* Rotating conic-gradient ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #D9A066, #6F4E37, #8B5E3C, #D9A066)",
          animation: "spin 12s linear infinite",
          filter: "saturate(110%)",
        }}
      />
      {/* Inner cutout to create the ring thickness */}
      <div className="absolute inset-2 rounded-full bg-primary" />

      {/* Dashed ring rotating in reverse for a subtle effect */}
      <div
        className="absolute inset-1 rounded-full border-2 border-dashed border-highlight"
        style={{ animation: "spin 18s linear infinite reverse" }}
      />

      {/* Glow pulse ring */}
      <div className="absolute inset-3 rounded-full border-4 border-accent glow-pulse" />

      {/* Logo image */}
      <img
        src="/logo.png"
        alt="Vintage Audio Logo"
        className="absolute inset-4 w-auto h-auto rounded-full object-cover border-4 border-border shadow-vintage"
      />
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data.slice(0, 4) : [];
        setFeatured(list);
        setState("loaded");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <div className="w-full min-h-screen bg-primary">
      {/* Hero */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <div className="vintage-card p-8 md:p-10">
              <h1 className="text-4xl md:text-6xl font-bold font-classic text-accent leading-tight">
                Vintage Audio Rentals & Sales
              </h1>
              <p className="text-lg md:text-xl text-textColor font-serif-vintage mt-5">
                Classic speakers, amps, and turntables with that warm, old-school sound. Perfect for weddings, parties, and collectors.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/items" className="vintage-button px-8 py-3 text-lg">Browse Items</Link>
                <Link to="/gallery" className="vintage-button px-8 py-3 text-lg">View Gallery</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center order-1 md:order-2">
            <LogoBadge />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="vintage-card p-6 flex items-start gap-4">
            <FaTags className="text-3xl text-accent" />
            <div>
              <h3 className="font-classic text-2xl text-accent">Rentals & Sales</h3>
              <p className="text-textColor font-serif-vintage">Hand-picked classic audio gear—rent for events or buy for your collection.</p>
            </div>
          </div>
          <div className="vintage-card p-6 flex items-start gap-4">
            <FaTruck className="text-3xl text-accent" />
            <div>
              <h3 className="font-classic text-2xl text-accent">Delivery & Setup</h3>
              <p className="text-textColor font-serif-vintage">Island-wide delivery with expert on-site setup for flawless sound.</p>
            </div>
          </div>
          <div className="vintage-card p-6 flex items-start gap-4">
            <FaHeadphonesAlt className="text-3xl text-accent" />
            <div>
              <h3 className="font-classic text-2xl text-accent">Authentic Sound</h3>
              <p className="text-textColor font-serif-vintage">Warm tones and rich textures—from woodgrain speakers to tube amps.</p>
            </div>
          </div>
          <div className="vintage-card p-6 flex items-start gap-4">
            <FaRecordVinyl className="text-3xl text-accent" />
            <div>
              <h3 className="font-classic text-2xl text-accent">Curated Collection</h3>
              <p className="text-textColor font-serif-vintage">Rare and reliable equipment, carefully maintained for performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full mt-12 md:mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-classic font-bold text-accent">Featured Gear</h2>
            <Link to="/items" className="vintage-button px-6 py-2">See All</Link>
          </div>
          {state === "loading" && (
            <div className="w-full h-[150px] flex items-center justify-center">
              <div className="w-[50px] h-[50px] border-4 rounded-full border-t-accent border-r-highlight border-b-interactive border-l-secondary animate-spin shadow-vintage" />
            </div>
          )}
          {state === "loaded" && (
            <>
              {/* Desktop: single row, 4 columns */}
              <div className="hidden md:grid md:grid-cols-4 md:gap-6">
                {featured.map((item) => (
                  <ProductCard key={item.key} item={item} />
                ))}
              </div>
              {/* Mobile: single horizontal line with scroll */}
              <div className="md:hidden flex flex-nowrap gap-4 overflow-x-auto py-2">
                {featured.map((item) => (
                  <div key={item.key} className="flex-none">
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            </>
          )}
          {state === "error" && (
            <div className="vintage-card p-6"> 
              <p className="text-textColor font-serif-vintage">Couldn’t load featured items right now. Please try again later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="vintage-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-classic font-bold text-accent">Ready to make some noise?</h3>
              <p className="text-textColor font-serif-vintage mt-2">Book your vintage audio setup or explore our gallery for inspiration.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/booking" className="vintage-button px-8 py-3 text-lg">Create Booking</Link>
              <Link to="/contacts" className="vintage-button px-8 py-3 text-lg">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
