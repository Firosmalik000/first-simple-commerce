import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import AddressCard from './adress/addressCard';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';
import Spinner from '../components/spinner';

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

                <Spinner />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
