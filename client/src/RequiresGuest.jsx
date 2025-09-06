import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("http://localhost:5001/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return user;
};

export default function RequiresGuest({ children }) {
  const user = useAuth();

  if (user === undefined) return <div>Loading...</div>;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
}
