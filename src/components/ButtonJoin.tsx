import { Link } from "react-scroll";

import s from "@/sections/Hero/Hero.module.css";

export function ButtonJoin() {
  return (
    <Link
      href="/"
      activeClass="active"
      to={`section_5`}
      spy={true}
      smooth={true}
      offset={50}
      duration={1500}
      className={`${s.button_hero} relative flex justify-center mt-[26.5px] tab:mt-[28px] w-[100%] py-[2.5px] tab:[w:auto] tab:block tab:px-[64px] tab:py-[14px] desk:py-[16px] cursor-pointer`}
    >
      JOIN NOW
    </Link>
  );
}