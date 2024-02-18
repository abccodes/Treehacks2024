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
interface ContainerProps {
  // Define your component props here
}

export const ContainerWithUpload: React.FC<ContainerProps> = () => {
  // Implement your component logic here
  const addJournalEntry = useMutation(api.myFunctions.addJournalEntry);

  const [dateLogged, setDateLogged] = React.useState({ Date: "" });
  const [notes, setNotes] = React.useState("");
  const [patientID, setPatientID] = React.useState<Id<"Patients"> | null>(null);
  const [storageID, setStorageID] = React.useState<Id<"_storage"> | null>(null);
  let navigate = useNavigate();

  // // @dev
  // // ConditionID: v.id("Conditions"),
  // // DateLogged: v.object({ Date: v.string() }),
  // // Notes: v.string(),
  // // PatientID: v.id("Patients"),

  async function handleUpload() {
    if (!patientID || !storageID) {
      console.error("PatientID or storageID is null");
      return;
    }

    try {
      await addJournalEntry({
        DateLogged: dateLogged,
        Notes: notes,
        PatientID: patientID,
        storageId: storageID,
      });
    } catch (e) {
      console.error(e);
    }
  }

  const [uploadUrl, setUploadUrl] = useState(""); // for getting the URLs

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // Generate a new upload URL for displaying
    const newUploadUrl = await generateUploadUrl();
    setUploadUrl(newUploadUrl);

    await saveStorageId({
      uploaded: { storageId: (uploaded[0].response as any).storageId },
    });
    navigate("/result", { state: { bla: "aad" } });
  };

  return (
    <div>
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
