import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {

    const checkAuth = async () => {

      const me = await fetch('http://localhost:5001/api/auth/me', {
        method: "GET", 
        credentials: 'include' 
      })

      if (me.status === 401) {

          const refresh = await fetch("http://localhost:5001/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (refresh.ok) {

            const me = await fetch('http://localhost:5001/api/auth/me', {
              method: "GET", 
              credentials: 'include' 
            }) 

          }

      }

      if (me.ok) {

        const data = await me.json();
        setUser(data.user);

      } else {

        setUser(null);

      }

      }; 

      checkAuth();
    }, []);

  return user;
};

export default function RequiresAuth({ children }) {
  const user = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return <div>Loading...</div>; 
  }
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
