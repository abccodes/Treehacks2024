import React, { useState, useEffect } from "react";
// import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { add } from "date-fns";

interface ContainerProps {
  // Define your component props here
}

export const ContainerWithUpload: React.FC<ContainerProps> = () => {
  const [PatientID, setPatientID] = useState(
    "jx734vamvx2d8phw70h9g13vcs6kqh3b"
  );
  const [Notes, setNotes] = useState("NOTES");
  const [uploadUrl, setUploadUrl] = useState(""); // for getting the URLs

  const addJournalEntry = useMutation(api.myFunctions.addJournalEntry);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);

  const handleUpload = async () => {
    console.log("handleUpload clicked");
    await addJournalEntry({
      PatientID: PatientID,
      Notes: Notes,
    });

    console.log("addJournelEntry called! ", addJournalEntry);
  };

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
      <Button onClick={handleUpload}>Test handleupload</Button>
      <Card className="w-screen">
        <CardHeader>
          <CardTitle>
            <h1
              style={{
                fontSize: "2em",
                fontFamily: "Arial",
                textAlign: "center",
              }}
            >
              Upload Your Image Below!
            </h1>{" "}
            {uploadUrl && (
              <p>
                Upload URL: <a href={uploadUrl}>{uploadUrl}</a>
              </p>
            )}
          </CardTitle>
          <UploadDropzone
            // Generate and set upload URL when button is used
            uploadUrl={() =>
              generateUploadUrl().then((url) => {
                setUploadUrl(url);
                return url;
              })
            }
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
