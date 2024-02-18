// shows up once submitted photo and response is generated.
import React from "react";
import ImageCard from "../components/ImageCard.tsx";

const OutputPage: React.FC = () => {
  // Code for the OutputPage component goes here

  return (
    <div>
      <ImageCard imageUrl={""} title={""} description={""} />
    </div>
  );
};

export default OutputPage;
