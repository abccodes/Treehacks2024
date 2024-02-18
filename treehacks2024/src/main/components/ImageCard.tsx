import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <h2>{title}title</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center w-100 h-100">
            {/* <img src={imageUrl} alt={title} className="w-50 h-50" /> */}
            <img src={imageUrl} alt="error" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{description}</p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ImageCard;
