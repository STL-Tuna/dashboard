import { useState, useEffect } from "react";
import {
  getCatalogue,
  getCatalogueDetails,
} from "../utils/services/dashboard/CatalgoueService";

export const useCatalogue = () => {
  const [catalogue, setCatalogue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const data = await getCatalogue();
        setCatalogue(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchCatalogue();
  }, []);

  return { catalogue, loading, error };
};

export const useCatalogueDetails = (id) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const data = await getCatalogueDetails(id);
        
        setDetails(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { details, loading, error };
};
