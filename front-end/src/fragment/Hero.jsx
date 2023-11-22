import { Link } from 'react-router-dom';
import pastaImg from '../img/pasta-1_prev_ui.png';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import HeroSkeleton from '../components/heroSkeleton';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
   
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>
          <HeroSkeleton />
        </div>
      ) : (
        // Render actual content when isLoading is false
        <>
          <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
            <div className="container mx-auto flex justify-around h-full">
              <div className="flex flex-col justify-center">
                <div className="font-semibold flex items-center uppercase">
                  <div className="w-10 h-[2px] bg-red-500 mr-3"></div>DISKON AKHIR TAHUN
                </div>
                <h1 className="text-[70px] loading-[1.1] font-light mb-4">
                  GEBYAR AKHIR TAHUN!!! <br />
                  <span className="font-semibold"> 12.12</span>
                </h1>
                <Link to={'/'} className="self-start uppercase font-semibold border-b-2 border-primary">
                  Discover More
                </Link>
              </div>
              <div className="hidden mt-10 w-1/2- lg:block">
                <img src={pastaImg} alt="Pasta" />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Hero;
