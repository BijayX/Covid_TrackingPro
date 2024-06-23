import React from 'react';

const Cards = ({ image, altText, title }) => {
  return (
    <div className="bg-white p-6 w-100 h-80 rounded-lg border  flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-2xl">
      <img src={image} alt={altText} className=" h-52 w-52 mb-4" /> 
      <p className="text-xl font-semibold">{title}</p>
    </div>
  );
};

export default Cards;
