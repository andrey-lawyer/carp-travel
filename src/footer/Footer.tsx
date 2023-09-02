import { Container } from "@/components/Container";
import { FormCareer } from "@/components/FormCareer";

import data from "@/data/footerData.json";

import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
      <footer
        id="section_5"
        className={`${s.footer} relative z-10 pt-14 pb-[54px]  tab:py-[64px]  desk:py-[104px]  `}
      >
        <div className={`${s.footer_gradient}   ${s.footer_up} `}></div>
        <div className={`${s.footer_gradient}  ${s.footer_down} `}></div>
        <Container>
          <h2 className="relative z-10 text-text-white uppercase font-thin  mb-9 tab:mt-0   tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
            Contact
            <span className=" font-medium "> US</span>
          </h2>
          <div className="desk:grid desk:grid-cols-[588px_1fr] desk:gap-[37px]">
            <div className="tab:flex tab:pl-[34px] tab:gap-[90px] tab:mb-16 desk:mb-0 desk:block desk:pr-[194px]">
              <address className="relative z-10 text-text-white not-italic">
                <div className="flex gap-5 justify-end mb-6 desk:mb-16">
                  <ul>
                    <li className="">
                      <a
                        href="tel:+380981234567"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sm_mob_footer tab:text-base_desk_place desk:text-lg"
                      >
                        +38 (098) 12 34 567
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+380731234567"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-sm_mob_footer tab:text-base_desk_place desk:text-lg"
                      >
                        +38 (073) 12 34 567
                      </a>
                    </li>
                  </ul>
                  <p className=" text-xs_chose_us font-extralight desk:text-xs_slogan ">
                    Phone number
                  </p>
                </div>
                <div className="flex gap-5 justify-end mb-[26px] desk:mb-[124px]">
                  <a
                    href="mailto:support@carptravel.com"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-sm_mob_footer tab:text-base_desk_place desk:text-lg"
                  >
                    support@carptravel.com
                  </a>
                  <p className="text-xs_chose_us font-extralight w-[81px] desk:text-xs_slogan">
                    E-mail
                  </p>
                </div>
              </address>
              <div className="relative z-10 text-text-white flex gap-5 justify-end mb-3 desk:flex-row-reverse desk:justify-start ">
                <p className="text-xs_chose_us font-extralight desk:text-xs_slogan desk:w-[81px]">
                  Follow us
                </p>
                <ul>
                  {data.socialMedia.map(({ name, link }, ind) => (
                    <li key={ind}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        href={link}
                        className="hover:underline focus:underline transition delay-300 ease-[cubic-bezier(0.4,0,0.2,1)] block w-[81px] text-sm_mob_footer tab:text-base_desk_place desk:text-lg"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <FormCareer type="contacts" />
          </div>
        </Container>
      </footer>
    </>
  );
};
