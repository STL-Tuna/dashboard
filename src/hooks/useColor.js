import { useState, useEffect } from "react";
import { getColors } from "../utils/services/dashboard/ColorService";

export const useColor = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const data = await getColors();
        setColors(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchColors();
  }, []);

  return { colors, loading, error };
};
