import { useState, useEffect, useCallback } from "react";
import { getTags } from "../utils/services/dashboard/TagService";

export const useTag = () => {
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchTags = useCallback(async () => {
    try {
      const data = await getTags();
      setTag(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [refreshKey, fetchTags]);

  const refetch = () => setRefreshKey((prev) => prev + 1);

  return { tag, loading, error, refetch };
};
