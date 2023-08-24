import { Container } from "@/components/Container";

import s from "./Hero.module.css";
import { ButtonJoin } from "@/components/ButtonJoin";

export const Hero = () => {
  return (
    <section
      className={`${s.section_hero} pt-[105px] pb-[58.5px] tab:pt-[122px] tab:pb-[64px]  desk:pt-[130px] desk:pb-[104px] `}
    >
      <div className={s.hero_up}></div>
      <Container>
        <h1 className="relative text-text-white font-thin  text-right text-xxl_mob tab:text-xxxl_tab desk:text-xxl_desk">
          <span className="font-medium desk:mr-2">7</span>
          <span className="tracking-[1.665px] tab:tracking-[8.71px] desk:tracking-[0]">
            DAYS
          </span>
          <span className="absolute block  right-[-5px] tab:right-[-10px] desk:right-[-30px]  bottom-[-13px] tab:bottom-[-7px] desk:bottom-[-2px]  font-light text-xs tab:text-sm_tab_h1 desk:text-base_desk tracking-[9.48px] tab:tracking-[25.9px] desk:tracking-[36.48px] ">
            JOURNEY
          </span>
        </h1>
        <div className="tab:absolute tab:top-[124px] desk:top-[133px]">
          <h2 className="text-text-white uppercase mt-[31px] tab:mt-0 font-medium  tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
            Uncover
            <span className="block font-thin ">Carpathian’s</span>
            <span className="block font-thin ">Secrets</span>
          </h2>
          <p className="text-text-white mt-6 tab:mt-[68px] desk:mt-[148px] text-xss font-extralight tab:text-sm_tab desk:text-base_desk_place">
            Hoverla / Yaremche / Zakarpattia /
            <span className="block desk:inline">
              Vorokhta / Synevyr Lake / Bukovel
            </span>
          </p>
        </div>
        <div className="tab:relative tab:w-[230px] desk:w-[294px] tab:left-[472px]  tab:bottom-[-61px] desk:left-[938px] desk:bottom-[-185px]">
          <p className="text-text-white  mt-6 tab:mt-0 text-sm font-extralight text-justify tab:text-base desk:text-lg">
            We offer you unforgettable trips to the most beautiful parts of the
            Carpathians. Enjoy stunning views, exciting expeditions, and the
            best service!
          </p>
          <ButtonJoin />
        </div>
      </Container>
    </section>
  );
};
