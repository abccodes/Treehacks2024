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
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="flex justify-center">
              <h2>{title}title</h2>
            </CardTitle>
            <CardDescription className="flex justify-center">
              <p>{description}desc</p>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center w-100 h-100">
            {/* <img src={imageUrl} alt={title} className="w-50 h-50" /> */}
            <div className="w-100 h-100">
              <img
                src="https://picsum.photos/seed/picsum/200/300"
                alt="error"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ImageCard;
