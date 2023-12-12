import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const DrinkCategory = ({ search }) => {
  const navigate = useNavigate();
  const { drink } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  const handleAddToCart = (product) => {
    if (loggedIn) {
      addToCart(product, product._id);
    } else {
      navigate('/login');
    }
  };
  return (
    <div className=" mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
      {drink
        .filter((item) => {
          return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
        })
        .map((product) => (
          <div key={product._id}>
               <div className=" mx-3 flex flex-col  h-[280px] mb-10 border border-slate-300 hover:scale-105 transition duration-300 relative  ">
                  <h1 className="absolute top-2 left-4 bg-red-500 px-3 py-1 text-white">{product.category.name}</h1>
                  <div className="w-[150px]-md h-[180px] rounded-[50px]     ">
                    <div className="w-[150px] h-[180px] items- mt-3 justify-center  mx-auto flex   ">
                      <div className="items-center justify-center flex">
                        <Link to={`/product/${product._id}`}>
                          <img className="hover:scale-110 transition duration-300  rounded-lg" src={`http://localhost:5000/${product.image_url}`} />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="text-center  text-semibold">{product.name}</div>
                  <div className="flex justify-between px-7 my-3">
                    <div className="  text-semibold items-center  w-[50%] font-bold flex ">Rp.{product.price}</div>
                    <button className="bg-orange-600 py-2  text-white  rounded-lg flex  w-[50%] mt-1 mb-1 justify-center px-1 items-center hover:bg-orange-400 transition duration-300" onClick={() => handleAddToCart(product)}>
                      add to cart
                    </button>
                  </div>
                </div>
          </div>
        ))}
    </div>
  );
};

export default DrinkCategory;
