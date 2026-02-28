import { Link } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-amber-400 to-orange-500 mb-8 shadow-lg">
          <AlertCircle className="w-12 h-12 text-white" />
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-xl text-gray-700 font-medium mb-2">
          Page Not Found
        </p>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
        >
          <Home className="w-5 h-5" />
          Go to Home
        </Link>
      </div>
    </div>
  );
}