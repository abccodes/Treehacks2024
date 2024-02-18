import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import "@xixixao/uploadstuff/react/styles.css";
import Test from "../../components/test";
import ShuffleHero from "../../Shufflehero.jsx";
import Navbar from "../components/Navbar.tsx";
import InputPage from "../pages/InputPage.tsx";
import { Toaster } from "@/components/ui/toaster";
export default function App() {
  console.log(useConvexAuth());

  return (
    <>
      <Test></Test>
      <Navbar />
      <Authenticated>
        <Toaster />
        <InputPage />
      </Authenticated>
      <Unauthenticated>
        <ShuffleHero />
      </Unauthenticated>
    </>
  );
}
