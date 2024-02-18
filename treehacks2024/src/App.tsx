import { Authenticated, Unauthenticated, useConvexAuth } from "convex/react";
import ShuffleHero from "./Shufflehero.jsx";
import Navbar from "./main/components/Navbar.tsx";
import InputPage from "./main/pages/InputPage.tsx";
import OutputPage from "./main/pages/OutputPage.tsx";

export default function App() {
  console.log(useConvexAuth());

  return (
    <main>
      <Navbar />
      <Authenticated>
        <OutputPage />
        {/* <InputPage /> */}
      </Authenticated>
      <Unauthenticated>
        <ShuffleHero />
      </Unauthenticated>
    </main>
  );
}
