import GoodbyeMessage from "@/components/goodbye";
import { Suspense } from "react";
import Loading from "../inspirations/loading";


const DownPage = () => {
    return (
      // Adjusted padding and margins for smaller screens
      <div className="mx-auto flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 md:p-24">
        <Suspense fallback={<Loading />}>
          <GoodbyeMessage />
        </Suspense>
      </div>
    );
  };


export default DownPage;