// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// interface CarouselProps {
//   images: string[];
// }

// const Carousel: React.FC<CarouselProps> = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     setCurrentImageIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   return (
//     <div>
//       <button onClick={handlePrev}>Previous</button>
//       <img src={images[currentImageIndex]} alt="Carousel Image" />
//       <button onClick={handleNext}>Next</button>
//     </div>
//   );
// };

// export default Carousel;