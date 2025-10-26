import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center justify-center px-4 py-12">
      <div className="vintage-card max-w-2xl p-8 text-center">
        <h1 className="text-6xl font-bold font-classic text-accent mb-6">
          Error 404
        </h1>
        <p className="text-2xl text-textColor font-serif-vintage mb-8">
          Page Not Found
        </p>
        <Link className="vintage-button inline-block px-8 py-3" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
