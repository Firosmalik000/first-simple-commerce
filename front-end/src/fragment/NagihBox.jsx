import React from 'react';
import Terlaris from './cardProduct/ProductTerlaris';

const NagihBox = () => {
  return (
    <section className="w-5/6 border mx-auto border-slate-300 my-10 rounded-[20px] ">
      <div className="flex items-center ml-10">
        <div className="w-[300px] h-[280px] bg-orange-600  flex items-center rounded-[20px] justify-center text-white">
          <h1 className="text-2xl font-bold">Product Terlaris</h1>
        </div>
        <div className="pt-10">
          <Terlaris />
        </div>
      </div>
    </section>
  );
};

export default NagihBox;
