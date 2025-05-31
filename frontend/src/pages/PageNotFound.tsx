import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-4">
      <h1 className="text-9xl font-extrabold text-gray-300">404</h1>
      <p className="text-2xl font-semibold mt-4 text-gray-700">
        Page Not Found
      </p>
      <p className="text-gray-500 mt-2 mb-6 max-w-md text-center">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
}
