import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

const AddressCard = ({ address }) => {
  return (
    <div>
      <div className="h-[250px] border-b w-[90%] mx-auto">
        <div className="flex mt-5 rounded rounded-lg mx-auto  w-[90%]">
          <span className="grid  grid-cols-2 gap-4 ml-5 text-xl  mb-2 w-full  h-[70px] items-center">
            <span className="text-2xl font-semibold">Alamat Pengiriman</span>
            <Link to="/address">
              <span className="flex justify-end text-3xl">
                <MdOutlineAddBox className="hover:text-green-500 transition-all duration-300" />
              </span>
            </Link>
          </span>
        </div>
        <table className="w-full border-separate border-spacing">
          <thead>
            <tr className="">
              <th className="border border-slate-600 rounded-md py-2 text-xl">No</th>
              <th className="border border-slate-600 rounded-md text-xl">Kelurahan</th>
              <th className="border border-slate-600 rounded-md max-md:hidden text-xl ">Kecamatan</th>
              <th className="border border-slate-600 rounded-md max-md:hidden text-xl">Kota</th>
              <th className="border border-slate-600 rounded-md  text-xl">Perovinsi</th>
              <th className="border border-slate-600 rounded-md  text-xl">detail</th>
              <th className="border border-slate-600 rounded-md  text-xl">Operation</th>
            </tr>
          </thead>
          <tbody>
            {address.length > 0 &&
              address.map((item) => (
                <tr className="h-10" key={item._id}>
                  <td className="border border-slate-700 rounded-md text-center ">{item.name}</td>
                  <td className="border border-slate-700 rounded-md text-center">{item.kelurahan}</td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">{item.kecamatan}</td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">{item.kota}</td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">{item.provinsi}</td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">{item.detail}</td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/address/edit/${item._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600 hover:bg-yellow-600 transition-all duration-300 hover:text-white rounded-full" />
                      </Link>
                      <Link to={`/address/delete/${item._id}`}>
                        <MdOutlineDelete className="text-2xl hover:bg-red-500 hover:text-white rounded-full transition-all duration-300 text-red-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddressCard;
