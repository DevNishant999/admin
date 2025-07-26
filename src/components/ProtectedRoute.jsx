import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  let userRole = null;

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      userRole = parsed.role || null;
    } catch (err) {
      console.error(
        "ProtectedRoute: Error parsing user from localStorage",
        err
      );
    }
  }

  // ✅ Not logged in? Kick to login
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If roles are specified, check if user has permission
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === null) {
      console.warn(
        `Bypassed Login`
      );
      return children;
    }
    console.warn(
      `Access blocked. User role "${userRole}" is not allowed here.`
    );
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
