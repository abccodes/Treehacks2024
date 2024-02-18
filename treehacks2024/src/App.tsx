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
import Test from "./components/test";
import ShuffleHero from "./Shufflehero.jsx";
import Navbar from "./main/components/Navbar.tsx";
import InputPage from "./main/pages/InputPage.tsx";

export default function App() {
  console.log(useConvexAuth());

  return (
    <main>
      <Test></Test>
      <Navbar />
      <Authenticated>
        <InputPage />
      </Authenticated>
      <Unauthenticated>
        <ShuffleHero />
      </Unauthenticated>
    </main>
  );
}
