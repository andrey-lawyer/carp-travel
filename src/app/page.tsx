
import { About } from "@/sections/About/About";
import { Career } from "@/sections/Career/Career";
import {Gallery} from "@/sections/Gallery/Gallery";
import { Hero } from "@/sections/Hero/Hero";
import { Services } from "@/sections/Services/Services";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Services />
        <Career />
        <Gallery />
      </main>
    </>
  );
}
