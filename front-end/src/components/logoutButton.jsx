import React, { useContext } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { useSnackbar } from 'notistack';

function Logoutbtn() {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  async function logout(e) {
    e.preventDefault();
    try {
      await axios.get('http://localhost:5000/api/auth/logout', {
        withCredentials: true,
      });
      await getLoggedIn();
      localStorage.removeItem('cart');
      navigate('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      enqueueSnackbar('Sampai Bertemu Kembali', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <button className="bg-red-500 text-white rounded rounded-lg py-3 px-3" onClick={logout}>
      Log Out?
    </button>
  );
}

export default Logoutbtn;
