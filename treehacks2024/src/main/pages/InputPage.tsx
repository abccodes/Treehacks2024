import React from "react";
import Container from "../components/Containter.tsx";
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
  );
};

export default InputPage;
