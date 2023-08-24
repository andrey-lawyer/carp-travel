
import Image from "next/image";

import { galleryDataMob } from "@/data/galleryData";

  
  export function GalleryMobile(   ) {
    return (
        <>
        <ul className="flex flex-col gap-6">
            {galleryDataMob.map((el, ind) => (
              <li key={ind}>
                <div className="relative w-[100%] h-[187px] ">
                  <Image
                    src={el}
                    alt={`image ${ind + 1}`}
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
  