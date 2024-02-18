// shows up once submitted photo and response is generated.
import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard.tsx";
import DescriptionCard from "../components/DescriptionCard.tsx";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const OutputPage: React.FC = () => {
  const { toast } = useToast();
  const [isHealthy, setIsHealthy] = useState(false);
  const location = useLocation();
  const { bla } = location.state;
  console.log(bla);

  useEffect(() => {
    // This will run when `isHealthy` changes.
    if (isHealthy) {
      toast({
        title: "Hooray: You look healthy",
        description:
          "We advise you to still routinely get check-ups and contact your physician",
      });
    } else {
      toast({
        title: "Alert: Contacting your physician",
        description: "We suspect that you may have early signs of cancer",
      });
    }
  }, [isHealthy, toast]); // Adding `toast` to dependency array if necessary, depending on your linting rules.

  return (
    <div>
      <ImageCard
        imageUrl={"https://picsum.photos/seed/picsum/200/300"}
        title={""}
        description={""}
      />
      <DescriptionCard description={"descr"} result={"result"} />

      <Button
        onClick={() => setIsHealthy(!isHealthy)} // Example toggle functionality for demonstration
      >
        Toggle Health Status
      </Button>
    </div>
  );
};

export default OutputPage;
