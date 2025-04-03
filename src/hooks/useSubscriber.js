import { useState, useEffect } from "react";
import { getSubscriber } from "../utils/services/dashboard/UserSubscriber";

export const useSubscriber = () => {
  const [subscriber, setSubscriber] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        const data = await getSubscriber();
        setSubscriber(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchSubscriber();
  }, []);

  return { subscriber, loading, error };
};
