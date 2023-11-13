import React, { useContext, useEffect, useState } from 'react';

import AddressCard from './adress/addressCard';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';

const CheckoutPage = () => {
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
  const { cart, total, itemAmount } = useContext(CartContext);

  return (
    <>
      <Header />
      <section className=" bg-blue-500">
        <div className=" shadow shadow-2xl   h-screen flex items-center">
          <div className="w-[80%] h-[80%] bg-white mx-auto border rounded-lg ">
            <AddressCard address={address} />

            <div className="h-[350px] w-[90%] border-b mx-auto mt-5">
              <div>
                <span className="grid  grid-cols-3 gap-4 ml-5 text-xl  mb-2 w-full  h-[70px] items-center">
                  <span className="text-2xl font-semibold mb-3">Sub Total</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p>Rp. {total}</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Jumlah</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p>{itemAmount}</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Biaya Ongkir</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p className="text-red-500">Free</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Biaya Admin</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p className="text-red-500">Free</p>
                  </span>
                  <span className="text-2xl font-semibold mb-3">Total</span>
                  <span>:</span>
                  <span className="flex justify-between text-2xl">
                    <p>Rp. {total}</p>
                  </span>
                </span>
              </div>
            </div>
            <Link to={'/invoice'}>
              <div className="w-full  flex justify-end">
                <button className="  bg-blue-600 rounded rounded-lg text-xl mx-[60px] mt-3 hover:bg-blue-900 transition-all px-5 flex py-3 px-3 text-white">Check Out </button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
