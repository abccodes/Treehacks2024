import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ContainerProps {
  // Define your component props here
}

const Container: React.FC<ContainerProps> = () => {
  // Implement your component logic here

  return (
    <div className="">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription>
            Upload thing here or replace whole card
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Container;
