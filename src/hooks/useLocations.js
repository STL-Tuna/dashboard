import { useState, useEffect } from "react";
import { getLocations } from "../utils/services/dashboard/LocationService";

export const useLocation = () => {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocation(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { location, loading, error };
};
