import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        403 - Unauthorized
      </h1>
      <p className="mb-4 text-gray-700">
        You do not have permission to view this page.
      </p>
      <Link to="/" className="px-4 py-2 text-white rounded bg-[#333c29]">
        Go to Home
      </Link>
    </div>
  );
}
