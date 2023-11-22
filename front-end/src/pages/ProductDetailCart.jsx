import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { CartContext } from '../contexts/CartContext';
import Header from '../fragment/Header';
import Footer from '../fragment/Footer';
import DetailSkeleton from '../components/detailSkeleton';
import { DarkMode } from '../contexts/DarkModeContext';

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [cartDetails, setCartDetails] = useState(null);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  useEffect(() => {
    setIsLoading(true);
    const fetchCartDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${_id}`);
        setCartDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartDetails();
  }, [_id]);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  return (
    <div>
      <Header />

      <section className={`pt-32 pb-12 lg:py-32 h-[87.2vh] ${isDarkMode && 'bg-slate-900 text-white transition duration-300'} flex items-center`}>
        <button className="absolute right-2 top-2 bg-blue-600 p-2 text-white rounded mt-20 mr-2" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? 'Light' : 'Dark'}
        </button>
        {cartDetails && (
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0 ">
                <img className="max-w-[200px] lg:max-w-sm rounded rounded-lg hover:scale-110 transition duration-300" src={`http://localhost:5000/${cartDetails.image_url}`} alt={cartDetails.name} />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{cartDetails.name}</h1>
                <div className="text-red-500 font-medium mb-6">$ {cartDetails.price} </div>
                <p className="mb-8"> {cartDetails.description} </p>
                <button onClick={() => addToCart(cartDetails, _id)} className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded rounded-lg transition duration-300  py-4 px-8 text-white">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;
