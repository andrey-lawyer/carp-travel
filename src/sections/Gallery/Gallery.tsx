"use client";

import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

import { Container } from "@/components/Container";
import { GalleryMobile } from "@/components/GalleryMobile";
import { GalleryTabAndDesk } from "@/components/GalleryTabAndDesk";

import "@/sections/Gallery/gallery.css";

export const Gallery = () => {

  return (
    <section  id="section_4" className="relative section_gallery py-14  tab:h-[575px] desk:h-[788px]  tab:py-16  desk:py-[104px]">
      <Container noPaddingDesk>
         <div className="gallery_gradient gallery_up"></div>
        <div className="gallery_gradient gallery_down"></div> 
        <h2 className="relative z-10 text-text-white tab:text-center desk:text-left mb-6 tab:mb-[72px] desk:mb-6 desk:pl-6 uppercase font-thin  tab:mt-0  tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
          OUR
          <span className=" font-medium "> GALLERY</span>
        </h2>
        <MediaQuery maxWidth={767.9}>
          <GalleryMobile/>
          </MediaQuery>
        <MediaQuery minWidth={768}>
          <GalleryTabAndDesk/>       
        </MediaQuery>
      </Container>
    </section>
  );
};
