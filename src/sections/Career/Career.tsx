"use client";

import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

import { Container } from "@/components/Container";
import { FormCareer } from "@/components/FormCareer";
import { ChooseUsMobile } from "@/components/ChooseUsMobile";
import { ListChooseUs } from "@/components/ListChooseUs";

import s from "./Career.module.css";

export const Career = () => {
  return (
    <>
      <MediaQuery maxWidth={767.9}>
        <ChooseUsMobile />
      </MediaQuery>
      <section
        id="section_3"
        className={`${s.section_career} relative z-10 py-14  tab:py-[64px]  desk:py-[104px]  `}
      >
        <MediaQuery maxWidth={1279.9}>
          <div className={`${s.career_gradient}   ${s.career_up} `}></div>
          <div className={`${s.career_gradient}  ${s.career_down} `}></div>
        </MediaQuery>
        <Container>
          <MediaQuery maxWidth={767.9}>
            <h2 className="visually-hidden">Feedback form</h2>
          </MediaQuery>

          <MediaQuery minWidth={768}>
            <div className="relative z-10 flex justify-between items-center desk:mb-6">
              <h2 className="relative z-10 text-text-white uppercase font-thin  tab:tracking-[-2.68px] desk:tracking-[-3.92px]  tab:text-xxxl_tab   desk:text-xxl_desk">
                Choose
                <span className=" font-medium "> US</span>
              </h2>
              <p className=" relative z-10 text-text-white w-[221px] desk:w-[293px] text-xs_13 desk:text-lg_career desk:text-justify font-extralight ">
                Your chance to join our passionate team in Carpathian tourism.
                Seeking talented professionals to share our common mission.
              </p>
            </div>
            <div className="flex">
              <h3 className="relative z-10 text-text-white mb-3 tab:mb-[56px] uppercase font-extralight text-xxl_mob_send desk:text-xxl_desk_career pl-[80px] desk:pl-[115px]  ">
                Why us ?
              </h3>
              <MediaQuery minWidth={1280}>
                <p className=" relative z-10 text-text-white w-[234px] text-lg font-extralight ml-[342px]">
                  {"Don't miss your opportunity!"}{" "}
                  <span className="block">
                    Fill out the form right now and join our team!
                  </span>
                </p>
              </MediaQuery>
            </div>
          </MediaQuery>

          <div className="tab:flex tab:gap-5 desk:gap-8 desk:mt-[14px]">
            <MediaQuery minWidth={768}>
              <ListChooseUs />
            </MediaQuery>
            <div>
              <MediaQuery maxWidth={1279.9}>
                <p className=" relative z-10 text-text-white w-[179px] tab:w-[221px] text-sm font-extralight ml-auto tab:ml-0 mb-6 tab:mb-8">
                  {"Don't miss your opportunity!"}{" "}
                  <span className="block">
                    Fill out the form right now and join our team!
                  </span>
                </p>
              </MediaQuery>
              <FormCareer />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
