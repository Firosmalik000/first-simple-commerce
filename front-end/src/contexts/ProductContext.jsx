import React, { createContext, useEffect, useState } from 'react';
import { getCamilanCategory, getDetailProduct, getDrinkCategory, getFoodCategory, getProducts } from '../service/productservice';
import { useParams } from 'react-router-dom';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const { _id } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getProducts((data) => {
        setProducts(data);
        setIsLoading(false);
      });
    }, 3000);
  }, []);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    if (_id) {
      getDetailProduct(_id, (data) => {
        setDetail(data);
      });
    }
  }, [_id]);

  const [drink, setDrink] = useState([]);
  useEffect(() => {
    getDrinkCategory((data) => {
      setDrink(data);
    });
  }, []);
  const [food, setFood] = useState([]);
  useEffect(() => {
    getFoodCategory((data) => {
      setFood(data);
    });
  }, []);
  const [camilan, setCamilan] = useState([]);
  useEffect(() => {
    getCamilanCategory((data) => {
      setCamilan(data);
    });
  }, []);

  return <ProductContext.Provider value={{ isLoading, detail, products, drink, food, camilan }}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
