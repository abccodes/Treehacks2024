// shows up once submitted photo and response is generated.
import React, { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard.tsx";
import DescriptionCard from "../components/DescriptionCard.tsx";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const OutputPage: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { data } = location.state;
  const [isHealthy, setIsHealthy] = useState(data.is_healthy);

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
      <Toaster />
      <ImageCard
        imageUrl={data?.image_url}
        title={data?.predicted_label}
        description={""}
      />
      <DescriptionCard
        description={data?.prompt_response}
        result={`${data?.predicted_label} ${
          isHealthy ? "(Non-cancerous)" : "(Cancerous)"
        }`}
      />

      <Button
        onClick={() => setIsHealthy(!isHealthy)} // Example toggle functionality for demonstration
      >
        Toggle Health Status
      </Button>
    </div>
  );
};

export default OutputPage;
