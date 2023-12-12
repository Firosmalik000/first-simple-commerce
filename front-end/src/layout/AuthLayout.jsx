import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkMode } from '../contexts/DarkModeContext';

const AuthLayout = (props) => {
  const { title, children, type } = props;
  //memanggil darkMode

  return (
    <div className={` flex flex-[800px] bg-hero2 w-[100%] bg-no-repeat bg-cover bg-center   min-h-screen items-center`}>
      <div className="w-[400px]-md justify-center flex py-[50px] px-5 rounded-[20px] ml-[200px] bg-white  border border-orange-400">
        <div className="w-full max-w-xs">
          <h1 className="text-orange-600 text-3xl font-bold mb-3 text-center"> {title}</h1>
          <p className="font-medium text-slate-500 mb-8 text-center">welcome plis enter your details</p>
          {children}

          <Navigation type={type} />
        </div>
      </div>
    </div>
  );
};
// conditional dalam bentuk if else
const Navigation = ({ type }) => {
  if (type === 'login') {
    return (
      <p className="text-sm mt-5 text-center">
        Dont have an account?{' '}
        <Link to="/Register" className="font-bold text-orange-600">
          <strong>Register</strong>
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm mt-5 text-center">
        Already have an account?{' '}
        <Link to="/Login" className="font-bold text-orange-600">
          <strong>Login</strong>
        </Link>
      </p>
    );
  }
};
export default AuthLayout;
