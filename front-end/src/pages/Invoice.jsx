import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { AddressContext } from '../contexts/adressContext';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const InvoicePage = () => {
  const { cart, total, itemAmount, clearUserCart } = useContext(CartContext);
  const { address } = useContext(AddressContext);

  return (
    <section className="bg-blue-400">
      <Link to={'/'}>
        <button onClick={clearUserCart} className="absolute right-2 top-2 bg-red-600 p-2 text-white hover:bg-red-800 hover:text-white transition duration-300 active:scale-95  rounded mt-20 mr-2">
          Back
        </button>
      </Link>
      <div className="   h-screen flex  items-center">
        <div className=" bg-white p-5 w-[500px] h-[80%] mx-auto border rounded-lg ">
          <h1 className="text-center text-4xl font-bold mt-5 text-blue-500 mb-5">Invoice</h1>
          <AiOutlineCheckCircle className="text-3xl text-green-500 mx-auto" />
          <div className="mb-5">
            <span className="underline">Alamat : </span>

            <p>Atas Nama : {address[0].name}</p>
            <p>Kelurahan : {address[0].kelurahan}</p>
            <p>Kecamatan : {address[0].kecamatan}</p>
            <p>Kabupaten : {address[0].kota}</p>
            <p>Provinsi : {address[0].provinsi}</p>
            <p>Detail : {address[0].detail}</p>

            <span>order : </span>

            <table className="mx-8 my-3 w-[80%]">
              <thead>
                <tr>
                  <th className="border">no</th>
                  <th className="border">Item</th>
                  <th className="border">Jumlah</th>
                  <th className="border">Harga</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border">{index + 1}</td>
                    <td className="border">{item.name}</td>
                    <td className="border">{item.amount}</td>
                    <td className="border">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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
