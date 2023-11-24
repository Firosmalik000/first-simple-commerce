import React from 'react';
import { useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useSnackbar } from 'notistack';

const DeleteAddress = () => {
  const { _id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteAddress = async () => {
    await axios
      .delete(`http://localhost:5000/api/adress/${_id}`)
      .then(() => {
        enqueueSnackbar('Address deleted successfully', { variant: 'success' });
        navigate('/checkout');
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
  console.log(_id);
  return (
    <div className="p-4">
      <h1 className="text-3xl my-4"> Delete Book</h1>

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto ">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button className="p-4 bg-red-600 text-white m-8 " onClick={handleDeleteAddress}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteAddress;
