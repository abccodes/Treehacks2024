import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface DescriptionCardProps {
  result: string;
  description: string;
}

const DescriptionCard: React.FC<DescriptionCardProps> = ({
  result,
  description,
}) => {
  return (
    <div className="flex justify-center mt-5">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle className="flex justify-center">Daignosis</CardTitle>
          <CardDescription className="flex justify-center">
            {result}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <p>{description}</p>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default DescriptionCard;
