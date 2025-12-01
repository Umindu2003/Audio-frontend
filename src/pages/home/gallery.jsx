import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Gallery() {
  const [state, setState] = useState("loading");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (state === "loading") {
      axios.get(`${backendUrl}/api/products`)
        .then((res) => {
          console.log(res.data);
          setItems(res.data);
          setState("loaded");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "Failed to load gallery");
          setState("error");
        });
    }
  }, [state]);

  const handleImageClick = (productKey) => {
    navigate(`/product/${productKey}`);
  };

  return (
    <div className="w-full min-h-screen bg-primary px-4 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="vintage-card p-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold font-classic text-accent mb-4 border-b-4 border-accent pb-4">
            Gallery
          </h1>
          <p className="text-xl text-textColor font-serif-vintage leading-relaxed mt-4">
            Browse through our collection of classic audio equipment
          </p>
        </div>
      </div>

      {/* Loading State */}
      {state === "loading" && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="w-[70px] h-[70px] border-4 rounded-full border-t-accent border-r-highlight border-b-interactive border-l-secondary animate-spin shadow-vintage"></div>
        </div>
      )}

      {/* Gallery Grid */}
      {state === "loaded" && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              item.image && item.image.length > 0 && item.image.map((imageUrl, imgIndex) => (
                <div
                  key={`${item.key}-${imgIndex}`}
                  className="group cursor-pointer"
                  onClick={() => handleImageClick(item.key)}
                >
                  <div className="relative vintage-card overflow-hidden aspect-square">
                    {/* Image */}
                    <img
                      src={imageUrl}
                      alt={`${item.name} - Image ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-textColor font-classic text-lg font-bold mb-1 drop-shadow-lg">
                          {item.name}
                        </h3>
                        <p className="text-accent font-serif-vintage text-sm uppercase tracking-wider drop-shadow-lg">
                          {item.category}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-highlight font-vintage font-bold text-lg drop-shadow-lg">
                            Rs. {item.price?.toFixed(2)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded ${
                            item.availability 
                              ? "bg-accent text-primary" 
                              : "bg-interactive text-textColor"
                          }`}>
                            {item.availability ? "Available" : "Unavailable"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Top Corner Badge */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-vintage font-bold shadow-vintage">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {state === "error" && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="vintage-card p-8 text-center">
            <h2 className="text-3xl font-bold font-classic text-accent mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-textColor font-serif-vintage">
              Unable to load the gallery. Please try again later.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {state === "loaded" && items.length === 0 && (
        <div className="w-full h-[400px] flex justify-center items-center">
          <div className="vintage-card p-8 text-center">
            <h2 className="text-3xl font-bold font-classic text-accent mb-4">
              No Items Yet
            </h2>
            <p className="text-textColor font-serif-vintage">
              Our gallery is currently empty. Check back soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
