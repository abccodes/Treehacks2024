import React, { useEffect, useState } from "react";
import ContainerWithUpload from "../components/Upload.tsx";
import "@xixixao/uploadstuff/react/styles.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Upload from "../components/Upload.tsx";

interface Props {
  creationTime: number;
}

const DateFormatComponent: React.FC<Props> = ({ creationTime }) => {
  // Convert the creation time to a date string
  const date = new Date(creationTime).toLocaleString("en-US", {
    timeZone: "UTC",
  });

  return (
    <div>
      <p>{date}</p>
    </div>
  );
};

const BlurrableImage: React.FC<any> = ({ imageURL }) => {
  const [isBlurred, setIsBlurred] = useState(true);

  return (
    <div className="w-100% mt-5">
      <img
        src={imageURL}
        alt="err"
        onClick={() => setIsBlurred(!isBlurred)}
        style={{
          filter: isBlurred ? "blur(15px)" : "none",
          cursor: "pointer",
          transition: "filter 0.3s ease",
        }}
      />
    </div>
  );
};

const InputPage: React.FC = () => {
  const [patientID, setPatientID] = useState(
    "k17bf2hn74rn9fhyagba3063d56kpnad"
  );

  const entries = useQuery(api.myFunctions.getEntries, {
    PatientID: patientID,
  });

  useEffect(() => {
    console.log("TESTING");
    console.log("Entries for user: ", entries);
  });

  return (
    <div>
      <div className="flex justify-center m-10">
        <div className="flex-column">
          <Upload />
        </div>
      </div>
      <div className="flex justify-center ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full overflow-hidden"
        >
          <CarouselContent>
            {entries?.map((entry: any, index: number) => (
              <CarouselItem key={entry._id} className="basis-1/3">
                <div className="p-1">
                  <Card className="flex-column aspect-square items-center justify-center p-6">
                    <CardHeader>
                      <CardTitle className="flex justify-center">
                        {" "}
                        <DateFormatComponent
                          creationTime={entry._creationTime}
                        />{" "}
                      </CardTitle>
                      <CardDescription className="flex justify-center">
                        Diagnosis
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <p>{entry.Notes}</p>
                    </CardContent>
                    <CardFooter className="flex justify-center align-items-center">
                      <BlurrableImage
                        imageURL={entry.imageURL}
                      ></BlurrableImage>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default InputPage;
