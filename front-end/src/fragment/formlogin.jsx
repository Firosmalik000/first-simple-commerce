import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log(response);
      localStorage.setItem('token', response.data.token);

      enqueueSnackbar('Login Berhasil', { variant: 'success' });
      await getLoggedIn();
      navigate('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50" label="Email" type="email" placeholder="exaple@gmail.com" name="email" onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input className="text-sm border rounded mb-5 w-full py-2 px-3 text-slate-700 placeholder: opacity-50" label="Password" type="password" placeholder="*********" name="password" onChange={(e) => setPassword(e.target.value)} />
      <button className="  bg-blue-600 w-full  text-white h-12  rounded-md" type="submit">
        Login
      </button>
    </form>
  );
};
export default FormLogin;
