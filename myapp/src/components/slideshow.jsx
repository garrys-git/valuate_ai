import React, { useState, useEffect } from "react";

const Slideshow = ({ images = [], interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(slide);
  }, [images.length, interval]);

  if (!images.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        No images
      </div>
    );
  }

  return (
    <div className="w-full h-full py-4 px-4 rounded-lg">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="object-contain w-full h-full transition duration-500 ease-in-out rounded-lg"
      />
    </div>
  );
};

export default Slideshow;