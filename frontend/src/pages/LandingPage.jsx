import { NavBar } from "@/components/NavBar";
import { CardHover } from '@/components/CardHover';
import { Globe } from '@/components/Globe';
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";

const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
      {/* <BackgroundRippleEffect /> */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <NavBar />
      <Globe />

      <div className="mt-30 w-full flex justify-center px-4 z-100" id="features">
        <div className="border-gray-800 border-8 rounded-4xl p-2 max-w-5xl w-full">
          <div className="border-gray-700 border-4 rounded-2xl p-6">
            <h1 className="mb-6 text-4xl font-extrabold text-white text-center">
              How to Play!
            </h1>
            <CardHover />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage
