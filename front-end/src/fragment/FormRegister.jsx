import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const FormRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasword] = useState('');
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    try {
      const registerData = { name, email, password };
      const res = await axios.post('http://localhost:5000/api/auth/register', registerData);
      console.log(res.data);
      enqueueSnackbar('Register Berhasil', { variant: 'success' });

      navigate('/login');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }
  return (
    <form onSubmit={register}>
      <label>Fullname</label>
      <input className="text-sm border rounded w-full mb-5 py-2 px-3 text-slate-700 placeholder: opacity-50" label="Full Name" type="text" placeholder="Insert Your Name" name="fullname" onChange={(e) => setName(e.target.value)} />
      <label>Email</label>
      <input className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50" label="Email" type="email" placeholder="exaple@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50" label="Password" type="password" placeholder="*********" name="password" onChange={(e) => setPasword(e.target.value)} />

      <button className="  bg-blue-600 w-full  text-white h-12  rounded-md">Register</button>
    </form>
  );
};
export default FormRegister;
