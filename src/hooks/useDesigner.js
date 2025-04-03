import { useState, useEffect, useCallback } from "react";
import {
  getDesigners,
  getDesignerById,
} from "../utils/services/dashboard/DesignerService";

export const useDesigners = () => {
  const [designers, setDesigners] = useState([]);
  const [currentDesigner, setCurrentDesigner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailError, setDetailError] = useState(null);

  // Fetch all designers
  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const data = await getDesigners();
        setDesigners(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDesigners();
  }, []);

  // Function to fetch a single designer
  const fetchDesignerById = useCallback(async (id) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const data = await getDesignerById(id);
      setCurrentDesigner(data);
    } catch (err) {
      setDetailError(err.message || "Error fetching designer");
    } finally {
      setDetailLoading(false);
    }
  }, []);

  // Function to refresh the designers list
  const refetch = async () => {
    setLoading(true);
    try {
      const data = await getDesigners();
      setDesigners(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    designers,
    currentDesigner,
    loading,
    detailLoading,
    error,
    detailError,
    fetchDesignerById,
    refetch,
  };
};
