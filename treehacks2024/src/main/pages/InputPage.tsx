import React from "react";
import Container from "../components/Upload.tsx";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import {
  //   Authenticated,
  //   Unauthenticated,
  //   useConvexAuth,
  useMutation,
  //   useQuery,
} from "convex/react";
import { api } from "../../../convex/_generated/api";
import "@xixixao/uploadstuff/react/styles.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const InputPage: React.FC = () => {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    await saveStorageId({
      uploaded: { storageId: (uploaded[0].response as any).storageId },
    });
  };

  return (
    <div>
      <div className="flex justify-center m-10">
        <div className="flex-column">
          <Container />
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={[".pdf", "image/*"]}
            onUploadComplete={saveAfterUpload}
            onUploadError={(error: unknown) => {
              // Do something with the error.
              alert(`ERROR! ${error}`);
            }}
          />{" "}
        </div>
      </div>
      <div className="flex justify-center ">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-w-lg overflow-hidden"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
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
