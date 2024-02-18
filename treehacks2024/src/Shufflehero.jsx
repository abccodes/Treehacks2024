import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SignInButton, UserButton } from "@clerk/clerk-react";


const ShuffleHero = () => {
  return (
    // <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
    // <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-8 mx-auto">
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-8 max-w-6xl mx-auto">

      <div>
        <span className="block mb-4 text-lg md:text-xl text-violet-500 font-large">
          Making diagnosis easy
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          Skin.ai
        </h3>
        <p className="text-base md:text-lg text-grey-700 my-4 md:my-6">
          Artificial intelligence meets dermatology. Get a medical consultation in minutes.
        </p>
        <SignInButton mode="modal" className="bg-violet-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-violet-600 active:scale-95">
          Sign in
        </SignInButton>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1630826888603-7eb14e9f05d1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1522108098940-de49801b5b40?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "./src/images/skincare3.jpg",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1509384473936-2d36ab6e198d?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 7,
    src: "./src/images/skincare7.jpg",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1643684391140-c5056cfd3436?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1630228462324-e29eec6e3f26?q=80&w=2376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1581182800629-7d90925ad072?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 15,
    src: "./src/images/skincare15.jpg",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 5000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;