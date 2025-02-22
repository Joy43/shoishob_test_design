import React from 'react';

export default function Button({ text }) {
  return (
    <button className="mt-6 px-6 py-3 text-white bg-[#2B2D42] hover:bg-[#D94E1B] rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
      {text}
    </button>
  );
}
