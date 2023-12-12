import React from 'react';
import { MdOutlineMessage } from 'react-icons/md';

const MessageButton = () => {
  return (
    <div className=" bg-orange-600 rounded-full animate-bounce p-6 border-white border fixed bottom-3 right-3">
      <MdOutlineMessage className="text-white text-5xl" />
    </div>
  );
};

export default MessageButton;
