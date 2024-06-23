import React from 'react';
import Header from '../components/Header';
import first from '../assets/svg/01.svg';
import second from '../assets/svg/02.svg';
import third from '../assets/svg/03.svg';
import fourth from '../assets/svg/04.svg';
import fifth from '../assets/svg/05.svg';
import sixth from '../assets/svg/06.svg';
import Cards from '../components/card/Cards';

const preventionTips = [
  { image: first, altText: "Wash Your Hands Often", title: "Wash Your Hands Often" },
  { image: second, altText: "Wear A Mask", title: "Wear A Mask" },
  { image: third, altText: "Use Alcohol Based Sanitizer", title: "Use Alcohol Based Sanitizer" },
  { image: fourth, altText: "Visit Doctor In Case Of Any Symptoms", title: "Visit Doctor In Case Of Any Symptoms" },
  { image: fifth, altText: "Keep Distance", title: "Keep Distance" },
  { image: sixth, altText: "Stay Home Stay Safe", title: "Stay Home Stay Safe" }
];

const Prevention = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Stay Safe</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {preventionTips.map((tip, index) => (
            <Cards
              key={index}
              image={tip.image}
              altText={tip.altText}
              title={tip.title}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Prevention;
