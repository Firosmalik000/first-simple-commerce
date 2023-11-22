import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import AddressCard from './adress/addressCard';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';

const CheckoutPage = () => {
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        const response = await axios.get(`http://localhost:5000/api/adress/user/${userId}`);

        setAddress(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchData();
  }, []);

  const { cart, total, itemAmount } = useContext(CartContext);
  const handleClick = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Order berhasil',
      icon: 'success',
    });
  };

  return (
    <>
      <Header />
      <section className=" bg-blue-500">
        <div className=" shadow shadow-2xl   h-screen flex items-center">
          <div className="w-[80%] mt-[40px] bg-white   mx-auto border rounded-lg ">
            {cart && cart.length > 0 ? (
              <>
                {' '}
                <AddressCard address={address} />
                <div className="h-[500px] w-[90%] border-b mx-auto mt-5">
                  <div>
                    <div className="w-full grid xl:grid-cols-4 md:grid-cols-2 gap-4">
                      {cart.map((item) => (
                        <div key={item._id} className="flex justify-between items-center mb-5 w-full">
                          <div className="flex items-center">
                            <img className="w-16 h-16 object-cover rounded-full" src={`http://localhost:5000/${item.image_url}`} />
                            <div className="ml-5">
                              <h3 className="text-lg font-medium">{item.name}</h3>
                              <p className="text-gray-600 text-sm">Jumlah : {item.amount}</p>
                              <p className="text-gray-600 text-sm">Rp. {item.price * item.amount}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <span className="grid  grid-cols-3 gap-4 ml-5 text-xl  mb-2 w-full  h-[70px] items-center">
                      <span className="text-2xl font-semibold mb-3">Sub Total</span>
                      <span>:</span>
                      <span className="flex justify-between text-2xl">
                        <p>Rp. {total}</p>
                      </span>
                      <span className="text-2xl font-semibold mb-3">Jumlah</span>
                      <span>:</span>
                      <span className="flex justify-between text-2xl">
                        <p>{itemAmount}</p>
                      </span>
                      <span className="text-2xl font-semibold mb-3">Biaya Ongkir</span>
                      <span>:</span>
                      <span className="flex justify-between text-2xl">
                        <p className="text-red-500">Free</p>
                      </span>
                      <span className="text-2xl font-semibold mb-3">Biaya Admin</span>
                      <span>:</span>
                      <span className="flex justify-between text-2xl">
                        <p className="text-red-500">Free</p>
                      </span>
                      <span className="text-2xl font-semibold mb-3">Total</span>
                      <span>:</span>
                      <span className="flex justify-between text-2xl">
                        <p>Rp. {total}</p>
                      </span>
                    </span>
                  </div>
                </div>
                <Link to={'/invoice'}>
                  <div className="w-full  flex justify-end">
                    <button onClick={handleClick} className="   bg-blue-600 rounded rounded-lg text-xl mx-[60px] mt-3 hover:bg-blue-900 transition-all px-5 flex py-3 px-3 text-white">
                      Check Out{' '}
                    </button>
                  </div>
                </Link>
              </>
            ) : (
              <div className="text-xl font-bold w-[80%]bg-white   mx-auto justify-center items-center flex rounded-lg h-[500px] gap-x-5">
                <div className="flex "> Tidak ada order </div>

                <div role="status">
                  <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
