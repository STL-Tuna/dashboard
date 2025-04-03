import { useState, useEffect } from "react";
import { getContacts } from "../utils/services/dashboard/ContactService";

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return { contacts, loading, error };
};
