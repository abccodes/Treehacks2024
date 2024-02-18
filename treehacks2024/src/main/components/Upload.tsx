import { useMutation } from "convex/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";

import React, { useState } from "react";
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

export const ContainerWithUpload: React.FC<ContainerProps> = () => {
  // Implement your component logic here

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
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
          // Display the upload URL if it exists
          {uploadUrl && (
          <p>Upload URL: <a href={uploadUrl}>{uploadUrl}</a></p>
        )}

          </CardTitle>
          <UploadDropzone
      
        // Generate and set upload URL when button is used
        uploadUrl={() => generateUploadUrl().then(url => { setUploadUrl(url); return url; })}

      fileTypes={{
        "application/pdf": [".pdf"],
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      }}
      onUploadComplete={saveAfterUpload}
      onUploadError={(error: unknown) => {
        // Do something with the error.
        alert(`ERROR! ${error}`);
      }}
    />
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

export default ContainerWithUpload;