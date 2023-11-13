import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Logoutbtn from '../components/logoutButton';

const ProfilePage = () => {
  return (
    <section className="bg-blue-400">
      <div className="   h-screen flex items-center">
        <div className=" bg-white h-[20%] w-[20%]    mx-auto border rounded-lg ">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl mb-3 font-bold">Are You Sure?</h1>
            <Logoutbtn className="text-3xl font-bold mb-5  " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
