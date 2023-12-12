import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

import { AddressContext } from '../contexts/adressContext';
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const InvoicePage = () => {
  const { cart, total, itemAmount, clearUserCart } = useContext(CartContext);
  const { address } = useContext(AddressContext);

  return (
    <section className="bg-orange-500">
      <Link to={'/'}>
        <button onClick={clearUserCart} className="absolute right-2 top-2 bg-red-600 p-2 text-white hover:bg-red-800 hover:text-white transition duration-300 active:scale-95  rounded mt-20 mr-2">
          Back
        </button>
      </Link>
      <div className="   h-screen flex  items-center">
        <div className=" bg-white p-5 w-[500px] h-[80%] mx-auto border rounded-lg ">
          <h1 className="text-center text-4xl font-bold mt-5 text-orange-500 mb-10">Invoice</h1>

          <div className="mb-5 h-[570px]">
            <span className="underline">Alamat : </span>
            <div className="grid grid-cols-2 ">
              <div>
                <div className="grid grid-cols-2">
                  <p>Atas Nama </p>
                  <p className="w-[300px]">: {address[0].name}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Kelurahan</p>
                  <p className="w-[300px]">: {address[0].kelurahan}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Kecamatan</p>
                  <p className="w-[300px]">: {address[0].kecamatan}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>kota</p>
                  <p className="w-[300px]">: {address[0].kota}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Provinsi</p>
                  <p className="w-[300px]">: {address[0].provinsi}</p>
                </div>
                <div className="grid grid-cols-2">
                  <p>Detail</p>
                  <p className="w-[300px]">: {address[0].detail}</p>
                </div>
              </div>
              <div></div>
            </div>

            <span>order : </span>

            <table className="mx-8 my-3 w-[80%] mb-5">
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
            <span className="grid grid-cols-2 xl:grid-cols-2 md:grid-cols-1">
              {' '}
              <span>
                <span className="grid grid-cols-2 text-sm  ">
                  <span>sub_total </span>
                  <span>: {total}</span>
                </span>
                <span className="grid grid-cols-2 text-sm ">
                  <span>Ongkos Kirim</span>
                  <span className="text-red-500">: Free</span>
                </span>
                <span className="grid grid-cols-2 text-sm   ">
                  <span>Total</span>
                  <span>: {total}</span>
                </span>

                <span className="grid grid-cols-2  text-sm  ">
                  <span>Status</span>
                  <span className="text-red-500">: Waiting Payment</span>
                </span>
              </span>
              <span>
                <span className="grid grid-cols-2    ">
                  <span>Contact :</span>
                  <span> </span>
                </span>
                <span className="grid grid-cols-2 text-sm  ">
                  <span>Service</span>
                  <span>: 085645256xxx</span>
                </span>

                <span className="grid grid-cols-2 text-sm   ">
                  <span>Web</span>
                  <span>: http://localhost:5173</span>
                </span>
              </span>
            </span>
          </div>
          <h1 className="text-center text-2xl font-bold mt-5 text-orange-600 mb-5">Terima kasih sudah belanja</h1>
        </div>
      </div>
    </section>
  );
};

export default InvoicePage;
