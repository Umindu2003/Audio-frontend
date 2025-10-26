import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="w-[300px] h-[520px] vintage-card overflow-hidden m-4 relative transform transition-all duration-300 hover:shadow-vintage-xl flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={item.image?.[0]}
          alt={item.name}
          className="w-full h-48 object-cover border-b-2 border-border"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-md shadow-vintage ${
              item.availability 
                ? "bg-accent text-primary border-2 border-highlight" 
                : "bg-interactive text-textColor border-2 border-border"
            }`}
          >
            {item.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col" style={{ height: 'calc(520px - 192px - 68px)' }}>
        <h2 className="text-xl font-classic font-bold text-textColor line-clamp-2 mb-2">{item.name}</h2>
        <p className="text-accent text-xs font-serif-vintage uppercase tracking-wider mb-2">{item.category}</p>
        <p className="text-textColor text-sm opacity-90 leading-relaxed line-clamp-4 mb-3">
          {item.description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-lg font-bold text-highlight font-vintage">Rs. {item.price}</span>
        </div>
        <div className="text-xs text-textColor opacity-80 font-vintage line-clamp-1">
          <span className="font-medium text-accent">Dimensions:</span> {item.dimensions}
        </div>
      </div>

      {/* Footer Button */}
      <div className="flex justify-center p-4 border-t-2 border-border bg-interactive bg-opacity-30">
        <Link 
          to={"/product/"+item.key} 
          className="vintage-button w-[90%] text-center py-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}