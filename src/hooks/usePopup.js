import { useState, useEffect } from "react";
import {
  getPopup,
} from "../utils/services/dashboard/PopupService";

export const usePopup = () => {
  const [popups, setPopup] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all designers
  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const data = await getPopup();
        console.log(data);
        setPopup(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  // Function to refresh the designers list
  const refetch = async () => {
    setLoading(true);
    try {
      const data = await getPopup();
      setPopup(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    popups,
    loading,
    error,
    refetch,
  };
};
