import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { AddressContext } from '../contexts/adressContext';
import { CartContext } from '../contexts/CartContext';

const InvoicePage = () => {
  const { cart, total, itemAmount } = useContext(CartContext);
  const { address } = useContext(AddressContext);

  return (
    <section className="bg-blue-400">
      <div className="   h-screen flex items-center">
        <div className=" bg-white p-10 w-[60%]-md mx-auto border rounded-lg ">
          <h1 className="text-center text-4xl font-bold mt-5 text-blue-500 mb-5">Invoice</h1>
          <AiOutlineCheckCircle className="text-3xl text-green-500 mx-auto" />
          <div className="mb-5">
            <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
              <span>order </span>
              <span> :</span>
              <ul>
                {cart.map((item) => (
                  <li key={item._id}>
                    <span>{item.name} </span>
                  </li>
                ))}
              </ul>
            </span>
            <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
              <span>sub_total </span>
              <span> </span>
              <span>{total}</span>
            </span>
            <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
              <span>Ongkos Kirim</span>
              <span> :</span>
              <span className="text-red-500">Free</span>
            </span>
            <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
              <span>Alamat</span>
              <span>
                {' '}
                <ul>
                  <li>Kelurahan :</li>
                  <li>Kecamatan :</li>
                  <li>Kabupaten :</li>
                  <li>Provinsi :</li>
                  <li>Detail :</li>
                </ul>
              </span>
              <span>
                <ul>
                  <li>{address[0].kelurahan}</li>
                  <li>{address[0].kecamatan}</li>
                  <li>{address[0].kota}</li>
                  <li>{address[0].provinsi}</li>
                  <li>{address[0].detail}</li>
                </ul>
              </span>
            </span>
            <span className="grid grid-cols-3 gap-4 ml-5 text-xl  mb-2">
              <span>Total</span>
              <span> :</span>
              <span>{total}</span>
            </span>
          </div>
          <h1 className="text-center text-2xl font-bold mt-5 text-blue-500 mb-5">Terima kasih sudah belanja</h1>
        </div>
      </div>
    </section>
  );
};

export default InvoicePage;
