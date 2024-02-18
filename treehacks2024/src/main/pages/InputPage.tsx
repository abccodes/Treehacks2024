import React, { useState } from "react";
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

  const [uploadUrl, setUploadUrl] = useState(''); // for getting the URLs

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {

    // Generate a new upload URL for displaying
    const newUploadUrl = await generateUploadUrl();
    setUploadUrl(newUploadUrl);

    await saveStorageId({
      uploaded: { storageId: (uploaded[0].response as any).storageId },
    });
  };

  return (
    <div>
      <div className="flex justify-center m-10">
        <div className="flex-column">
          <Container />

          // Display the upload URL if it exists
          {uploadUrl && (
          <p>Upload URL: <a href={uploadUrl}>{uploadUrl}</a></p>
        )}

          <UploadButton

            // Generate and set upload URL when button is used
            uploadUrl={() => generateUploadUrl().then(url => { setUploadUrl(url); return url; })}

            
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
          className="w-full overflow-hidden"
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
