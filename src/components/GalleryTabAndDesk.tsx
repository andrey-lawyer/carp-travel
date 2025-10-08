import { useRef } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperCore } from "swiper/types";
import { Navigation } from "swiper/modules";
import data from "@/data/galleryData.json";
import "@/sections/Gallery/gallery.css";

export function GalleryTabAndDesk() {
  const swiperRef = useRef<SwiperCore>();
  return (
    <> 
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        freeMode={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        loop={true}
        spaceBetween={"24px"}
        speed={1000}
      >
        {data.galleryData.map((el, ind) => (
          <SwiperSlide
            key={ind}
            style={{ width: "auto" }}
            className="w-[400px]"
          >
            {({ isActive }) => (
              <>
                <div
                  className={`${
                    isActive ? "active_image" : "not_active_image"
                  }   relative  "}
                >
                  <Image
                    src={el.url}
                    alt={el.alt}
                    fill={true}
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                    sizes="100%"
                  />
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute bottom-[59px] desk:bottom-[94px] z-10 w-[704px] desk:w-[1280px] flex justify-between text-white text-xxl_tab_nav_image font-thin pl-[37px] pb-[17px] pr-[38px] desk:px-6">
        <button
          type="button"
          className="desk:w-[294px] desk:text-right bg-blue-500 hover:bg-blue-700 focus:bg-blue-700" /* Change button styles to blue */
          onClick={() => swiperRef.current?.slidePrev()
          }
        >
          BACK
        </button>
        <button
          type="button"
          className="desk:w-[294px] desk:text-left bg-blue-500 hover:bg-blue-700 focus:bg-blue-700"
          onClick={() => {
            return swiperRef.current?.slideNext();
          }}
        >
          NEXT
        </button>
      </div>
    </>
  );
}