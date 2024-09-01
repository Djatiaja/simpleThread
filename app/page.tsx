import { Suspense } from "react";
import HeroSection from "./component/HeroSection/heroSection";

export default function Page() {
  return (
    <>
      <div className="flex mx-auto pt-5 w-full h-lvh px-10 justify-center items-center ">
        <div className="flex-row h-60">
          <h1 className="font-bold text-3xl">Welcome to my blog</h1>
          <p className="text-xl">
            This is a blog about my thoughts and experiences.
          </p>
        </div>
      </div>

      
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
    </>
  );
}
