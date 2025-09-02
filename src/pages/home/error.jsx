import { Link } from "react-router-dom";

export default function ErrorNotFound() {
  return (
    <div>
      <h1>Error 404: Page Not Found</h1>
      <Link className="text-blue-500 hover:underline bg-yellow-300 p-1" to="/">Go to Home</Link>
    </div>
  );
}
