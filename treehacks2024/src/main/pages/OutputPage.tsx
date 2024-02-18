// shows up once submitted photo and response is generated.
import React , {useState} from "react";
import ImageCard from "../components/ImageCard.tsx";
import DescriptionCard from "../components/DescriptionCard.tsx";
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button";

const OutputPage: React.FC = () => {
    const { toast } = useToast()
    const [ isHealthy, setIsHealthy ] = useState(false)
    
  return (
    <div>
      <ImageCard
        imageUrl={"https://picsum.photos/seed/picsum/200/300"}
        title={""}
        description={""}
      />
      <DescriptionCard description={"descr"} result={"result"} />
      if(isHealthy){

         // toast({
        //   title: "Alert: Contacting your physician",
        //   description: "We suspect that you may have early signs of cancer",
        // })       
      }

      <Button
      onClick={() => {
        // toast({
        //   title: "Alert: Contacting your physician",
        //   description: "We suspect that you may have early signs of cancer",
        // })
        toast({
            title: "Hooray: You look healthy",
            description: "We advise you to still routinely get check-ups and contact your physician"})
        
      }}
    >
      Show Toast
    </Button>
    </div>
  );
};

export default OutputPage;
