import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/adress')
      .then((res) => {
        setAddress(res.data.data);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <AddressContext.Provider value={{ address }}>{children} </AddressContext.Provider>;
};

export default AddressProvider;
