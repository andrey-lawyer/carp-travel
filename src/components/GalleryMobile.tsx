import Image from "next/image";

import data from "@/data/galleryData.json";

export function GalleryMobile() {
  return (
    <>
      <ul className="flex flex-col gap-6">
        {data.galleryDataMob.map((el, ind) => (
          <li key={ind}>
            <div className="relative w-[100%] h-[187px] ">
              <Image
                src={el.url}
                alt={el.url}
                loading="lazy"
                fill={true}
                style={{ objectFit: "cover" }}
                sizes="100%"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
