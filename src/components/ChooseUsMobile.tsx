import { Container } from "@/components/Container";
import { ListChooseUs } from "./ListChooseUs";

import s from "@/sections/Career/Career.module.css";

export const ChooseUsMobile = () => {
  return (
    <section
      id="section_0"
      className={`${s.section_career} relative z-10 py-14  tab:py-[64px]  desk:py-[104px]  `}
    >
      <div className={`${s.career_gradient}   ${s.career_up} `}></div>
      <div className={`${s.career_gradient}  ${s.career_down} `}></div>
      <Container>
        <h2 className="relative z-10 text-text-white uppercase font-thin   mb-6  tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
          Choose
          <span className=" font-medium "> US</span>
        </h2>

        <p className=" relative z-10 text-text-white w-[179px] text-sm font-extralight ml-auto mb-9">
          Your chance to join our passionate team in Carpathian tourism.
          <span className="block">
            Seeking talented professionals to share our common mission.
          </span>
        </p>
        <h3 className=" text-text-white mb-9 uppercase font-extralight text-xxl_mob_send pr-[39px] text-right">
          Why us ?
        </h3>
        <ListChooseUs />
      </Container>
    </section>
  );
};
