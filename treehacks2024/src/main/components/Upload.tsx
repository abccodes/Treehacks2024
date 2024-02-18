import { Id } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { UploadDropzone, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContainerProps {
  // Define your component props here
}

export const ContainerWithUpload: React.FC<ContainerProps> = () => {
  // Implement your component logic here

  const [PatientID, setPatientID] = useState(
    "k1760vtpwhv79k9j36ah2r3rm16kq5x5"
  );
  const [Notes, setNotes] = useState("NOTES");
  const [uploadUrl, setUploadUrl] = useState(""); // for getting the URLs

  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const addJournalEntry = useMutation(api.myFunctions.addJournalEntry);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);

  const handleUpload = async () => {
    try {
      console.log("handleUpload clicked");
      await addJournalEntry({
        PatientID: PatientID,
        Notes: Notes,
      });

      console.log("addJournelEntry called! ", addJournalEntry);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // Generate a new upload URL for displaying
    // const newUploadUrl = await generateUploadUrl();
    // setUploadUrl(newUploadUrl);
    setIsLoading(true);
    await saveStorageId({
      uploaded: { storageId: (uploaded[0].response as any).storageId },
    });

    fetch("http://127.0.0.1:5000/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        navigate("/result", { state: { data } });
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div>
      {/* <Button onClick={handleUpload}>Test handleupload</Button> */}

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
            </h1>
          </CardTitle>
          {isLoading ? <h1>Loading...</h1> : <></>}
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
