import { Container } from "@/components/Container";

import s from "./About.module.css";

export const About = () => {
  return (
    <section
      id="section_1"
      className={`${s.section_about} relative z-10 pt-[55px] pb-[54px] tab:py-[64px]   desk:py-[104px]  `}
    >
      <div className={`${s.about_gradient}   ${s.about_up} `}></div>
      <div
        className={`hidden desk:block ${s.about_gradient}  ${s.about_down} `}
      ></div>
      <Container>
        <div className="tab:grid grid-cols-[1fr_221px] desk:grid-cols-[606px_1fr] desk:gap-6">
          <h2 className="relative z-10 text-text-white uppercase font-thin  tab:mt-0   tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
            Who
            <span className=" font-medium "> We Are</span>
          </h2>
          <div className="relative z-10 flex flex-col gap-5 w-[180px] tab:w-[221px] desk:tab:w-[292px] tab:gap-4 text-text-white text-sm tab:text-base desk:text-lg font-extralight mt-2 tab:mt-[9px]">
            <p>
              <span className="font-normal">a team of enthusiasts</span> who are
              fully committed to the mission of creating unforgettable and
              extraordinary trips to the most beautiful parts of the
              Carpathians. Our goal is not just to show you the natural wonders
              of the mountains, but to provide you with a deep immersion in
              their magical atmosphere.
            </p>
            <p>
              <span className="font-normal">We believes</span> that nature has
              the power to inspire, strengthen character and provide new
              perspectives. Therefore, each of our tours is aimed at unlocking
              your potential, enriching your spiritual world and creating
              unforgettable memories.
            </p>
          </div>
        </div>
        <div className="desk:flex desk:flex-row-reverse desk:justify-between desk:mt-[72px] desk:relative">
          <div className=" text-text-white w-[180px] tab:w-[221px] desk:w-[297px] ml-auto text-sm tab:text-base desk:text-lg mt-10 desk:mt-0  tab:ml-0 tab:absolute tab:bottom-[188px] desk:static ">
            <strong className=" block  uppercase   ">
              From vacationers
              <span className="block text-right tab:w-[218px] desk:w-[293px]">
                to active travelers
              </span>
            </strong>
            <p className="font-extralight tracking-[-0.14px]  tab:tracking-[0.32px] desk:tracking-[2.16px]">
              we have a tour for everyone.
            </p>
          </div>
          <p className="text-text-white  text-sm font-extralight mt-10 tab:mt-16 desk:mt-0 tab:w-[463px] desk:w-[605px] tab:ml-auto desk:ml-0 tab:text-base desk:text-lg ">
            <span className=" font-normal ">We use methods</span> that are
            time-tested and proven. Our expert guides with in-depth knowledge of
            the Carpathian landscapes lead you safely through the mysteries of
            these mountains.
          </p>
        </div>
      </Container>
    </section>
  );
};
