import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import "@xixixao/uploadstuff/react/styles.css";
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
