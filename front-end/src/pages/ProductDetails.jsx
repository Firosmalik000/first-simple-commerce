import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import Header from '../fragment/Header';
import Footer from '../fragment/Footer';
import AuthContext from '../contexts/AuthContext';
import DetailSkeleton from '../components/detailSkeleton';
import { DarkMode } from '../contexts/DarkModeContext';

const ProductDetails = () => {
  const { _id } = useParams();
  const { products, detail } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  useEffect(() => {
    getLoggedIn();
  }, [getLoggedIn]);

  const product = _id ? products.find((item) => item._id === _id) : detail;
  const handleAddToCart = (product) => {
    if (loggedIn) {
      addToCart(product, product._id);
    } else {
      navigate('/login');
    }
  };

  if (!product) {
    return <DetailSkeleton />;
  }

  const { name, price, description, image_url } = product;
  return (
    <div>
      <Header />

      <section className={`pt-32 pb-12 lg:py-32 h-[87.2vh] flex items-center  ${isDarkMode && 'bg-slate-900 text-white transition duration-300'}`}>
        <button className="absolute right-2 top-2 bg-blue-600 p-2 text-white rounded mt-20 mr-2" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0 ">
              <img className="max-w-[200px] lg:max-w-sm rounded rounded-lg hover:scale-110 transition duration-300" src={`http://localhost:5000/${image_url}`} />
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{name}</h1>
              <div className="text-red-500 font-medium mb-6">$ {price} </div>
              <p className="mb-8"> {description} </p>
              <button onClick={() => handleAddToCart(product)} className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded rounded-lg   transition duration-300  py-4 px-8 text-white">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;
