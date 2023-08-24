"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { list, servicesData } from "@/data/servicesData";

import { Container } from "@/components/Container";

import "@/sections/Services/services.css";

export const Services = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<p class="' + className + '">' + list[index] + "</p>";
    },
  };
  return (
    <section id="section_2" className="h-[851px] tab:h-[621px] desk:h-[779px] relative">
      <div className="services_gradient services_up"></div>
      <div className="services_gradient services_down"></div>
      <div className="relative  w-full mx-auto px-5 mob:w-[480px] tab:px-8 tab:w-[768px] desk:w-[1280px] desk:px-[24px]  ">
        <h2 className="absolute top-[54px] tab:top-[65px] desk:top-[104px] z-10 text-text-white uppercase font-thin  tab:mt-0  tracking-[-1.6px] tab:tracking-[-2.68px] desk:tracking-[-3.92px] text-xxxl_mob tab:text-xxxl_tab   desk:text-xxl_desk">
          We
          <span className=" font-medium "> Offer</span>
        </h2>
      </div>
    
      <Swiper
        space-between={30}
        effect={"fade"}
        fadeEffect={{
          crossFade: true,
        }}
        pagination={pagination}
        modules={[EffectFade, Pagination]}
        className="w-[100%] h-[100%] "
      >
          {servicesData.map((el, ind) => (
            <SwiperSlide
              key={ind}
              className={`slider_common slider_${ind + 1} text-text-white pt-[134px] tab:pt-[64px]  desk:pt-[104px]`}
            >
              <Container>
                <p className="text-text-white font-thin text-xxxl_mob_date tab:text-xxxl_tab_date desk:text-xxl_desk text-right desk:pr-[368px]">0{ind + 1}/<span className="text-text-date">05</span></p>
               <div className="tab:grid tab:grid-cols-[463px_1fr] tab:gap-5 tab:mt-9 tab:h-[375px] desk:grid-cols-[607px_1fr] desk:gap-[332px] ">
                <div className="relative  h-[213px] tab:w-[463px] tab:h-[370px] desk:w-[607px] desk:h-[429px] mt-4 tab:mt-0">
                <Image
                
                  src={el.image}
                  alt={`image ${ind + 1}`}
                  fill={true}
                  loading = 'lazy' 
                  style={{ objectFit: "cover" }}
                  sizes="100%,  (min-width: 768px) 463px, (min-width: 1280px) 607px"
                />
                </div>
                <div className={`tab:mt-[197px] desk:mt-0 tab:flex tab:flex-col tab:justify-between slogan-${ind} `}>

                <p className="text-right tab:text-left text-xs_slogan font-extralight mt-3 tab:mt-0 ">{el.slogan}</p>
                <p className="text-sm tab:text-xs_13 text-justify font-extralight   mt-[224px] tab:mt-0 tab:block">{el.text}</p>
                </div>
                </div>
              </Container>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
