import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const response = await axios.get(`http://localhost:5000/api/adress/user/${userId}`);

        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, []);
  return <AddressContext.Provider value={{ address }}>{children} </AddressContext.Provider>;
};

export default AddressProvider;
