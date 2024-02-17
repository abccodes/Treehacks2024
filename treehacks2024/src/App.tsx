import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../convex/_generated/api";
import ShuffleHero from "./Shufflehero.jsx"

export default function App() {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStorageId = useMutation(api.files.saveStorageId);
  const saveAfterUpload = async (uploaded: UploadFileResponse[]) => {
    await saveStorageId({ uploaded: {storageId: (uploaded[0].response as any).storageId }});
  };

    return (
      // <main className="container max-w-2xl flex flex-col gap-8">
      <main className="container max-w-full flex flex-col gap-8">


        <ShuffleHero />
      <Authenticated>
          <SignedIn />
          <UploadButton
            uploadUrl={generateUploadUrl}
            fileTypes={[".pdf", "image/*"]}
            onUploadComplete={saveAfterUpload}
            onUploadError={(error: unknown) => {
              // Do something with the error.
              alert(`ERROR! ${error}`);
            }}
          />
        </Authenticated>
        <Unauthenticated>
          <div className="flex justify-center">
            <SignInButton mode="modal">
              <Button>Sign in</Button>
            </SignInButton>
          </div>
        </Unauthenticated>
      </main>
    );
  }

  function SignedIn() {

  return (
    <>
      {/* <p>Welcome {viewer}!</p> */}
      <p className="flex gap-4 items-center">
        This is you:
        <UserButton afterSignOutUrl="#" />
      </p>
      <p>
        hello test 1
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

      </p>
    </>
  );
}