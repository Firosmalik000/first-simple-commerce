import { Link } from 'react-router-dom';
import bg from '../img/bg.png';
import minum from '../img/minum.png';
import camilan from '../img/camilan.jpg';
import { useContext, useEffect, useState } from 'react';

import HeroSkeleton from '../components/heroSkeleton';
import { DarkMode } from '../contexts/DarkModeContext';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useContext(DarkMode);

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
        <section className={` px-[10%] pt-[220px]  ${isDarkMode && 'bg-slate-900 text-white transition'}  gap-1  flex justify-between `}>
          <div className="grow-2">
            <img src={bg} alt="" className="rounded-l-[50px] " />
          </div>
          <div className="w-[2000px]  h-full mx-auto  ">
            <img src={camilan} alt="" className="items-center flex justify-center mx-auto w-full border rounded-tr-[50px]" />
            <img src={minum} alt="" className="items-center flex justify-center mx-auto w-full  rounded-br-[50px]" />
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
