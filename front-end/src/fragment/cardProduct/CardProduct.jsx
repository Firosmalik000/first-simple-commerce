import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { CartContext } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const Product = ({ search }) => {
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);
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
      {products
        .filter((item) => {
          return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search);
        })
        .map((product) => (
          <div key={product._id}>
            <div className=" mx-3 flex flex-col  h-[400px] mb-10  ">
              <div className="w-[300px]-md h-[300px] rounded-[50px] rounded border  border-slate-300 ">
                <div className="w-[200px] h-[250px] items- mt-4 justify-center  mx-auto flex   ">
                  <div className="items-center justify-center flex">
                    <Link to={`/product/${product._id}`}>
                      <img className="hover:scale-110 transition duration-300 rounded rounded-lg" src={`http://localhost:5000/${product.image_url}`} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center text-xl text-semibold">{product.name}</div>
              <div className="text-center text-xl text-semibold">{product.price}</div>
              <button className="bg-blue-500 py-2 mx-auto text-white rounded rounded-lg flex mx-auto w-[80%] mt-1 mb-1 justify-center px-1 items-center hover:bg-blue-800 transition duration-300" onClick={() => handleAddToCart(product)}>
                add to cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Product;
