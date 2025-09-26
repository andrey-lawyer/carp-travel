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
      className={`${s.button_hero} relative bg-red-600 hover:bg-red-700 focus:bg-red-700 flex justify-center text-text-white mt-[26.5px] tab:mt-[28px] w-[100%] text-button-join py-[2.5px] tab:[w-auto] tab:block tab:text-button-join-tab tab:px-[64px] tab:py-[14px] desk:text-button-join-desk desk:py-[16px] cursor-pointer`} /* Updated to red background */
    >
      JOIN NOW
    </Link>
  );
}
