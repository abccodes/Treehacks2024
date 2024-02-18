// shows up once submitted photo and response is generated.
import React from "react";
import ImageCard from "../components/ImageCard.tsx";
import DescriptionCard from "../components/DescriptionCard.tsx";

const OutputPage: React.FC = () => {
  return (
    <div>
      <ImageCard
        imageUrl={"https://picsum.photos/seed/picsum/200/300"}
        title={""}
        description={""}
      />
      <DescriptionCard description={"descr"} result={"result"} />
    </div>
  );
};

export default OutputPage;
