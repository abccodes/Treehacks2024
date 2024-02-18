import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import "@xixixao/uploadstuff/react/styles.css";
import Test from "../../components/test";
import ShuffleHero from "../../Shufflehero.jsx";
import Navbar from "../components/Navbar.tsx";
import InputPage from "../pages/InputPage.tsx";
export default function App() {
  console.log(useConvexAuth());

  return (
    <>
      <Navbar />
      <Authenticated>
        <InputPage />
      </Authenticated>
      <Unauthenticated>
        <ShuffleHero />
      </Unauthenticated>
    </>
  );
}
