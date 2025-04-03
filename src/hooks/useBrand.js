// src/hooks/useBrand.js
import { useState, useEffect } from 'react';
import { getBrands } from '../utils/services/dashboard/BrandService';

export const useBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await getBrands();
        setBrands(response); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};