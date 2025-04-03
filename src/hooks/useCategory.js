import { useState, useEffect, useCallback } from "react";
import { getCategories } from "../utils/services/dashboard/CategoryService";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategory();
  }, [refreshKey, fetchCategory]);

  const refetch = () => setRefreshKey((prev) => prev + 1);

  return { categories, loading, error, refetch };
};
