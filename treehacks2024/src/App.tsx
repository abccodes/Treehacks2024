import React, { useState } from 'react'; // changed this line
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useConvexAuth,
  useMutation,
  useQuery,
} from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../convex/_generated/api";
import ShuffleHero from "./Shufflehero.jsx";

export default function App() {
  const [uploadUrl, setUploadUrl] = useState(''); // changed this line

  console.log(useConvexAuth());

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    // Generate a new upload URL for displaying
    const newUploadUrl = await generateUploadUrl();
    setUploadUrl(newUploadUrl); // changed this line

    await saveStorageId({
      uploaded: { storageId: (uploaded[0].response as any).storageId },
    });
  };

  return (
    <main className="container max-w-full flex flex-col gap-8">
      <Authenticated>
        <UserButton afterSignOutUrl="#" />

        <SignedIn />
        {uploadUrl && ( // changed this line
          <p>Upload URL: <a href={uploadUrl}>{uploadUrl}</a></p>
        )}
        <UploadButton
          uploadUrl={() => generateUploadUrl().then(url => { setUploadUrl(url); return url; })} // Generate and set upload URL when button is used
          fileTypes={[".pdf", "image/*"]}
          onUploadComplete={saveAfterUpload}
          onUploadError={(error: unknown) => {
            // Do something with the error.
            alert(`ERROR! ${error}`);
          }}
        />
      </Authenticated>
      <Unauthenticated>
        <ShuffleHero />
      </Unauthenticated>
    </main>
  );
}

function SignedIn() {
  return (
    <>
      <p className="flex gap-4 items-center">
        This is you:
        <UserButton afterSignOutUrl="#" />
      </p>
      <p>
        Click the button below and open this page in another window - this data
        is persisted in the Convex cloud database!
      </p>

      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        Check out{" "}
        <a
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          href="https://docs.convex.dev/home"
        >
          Convex docs
        </a>
      </p>
    </>
  );
}
