import dynamic from "next/dynamic";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

import data from "@/data/chooseUsData.json";

export function ListChooseUs() {
  return (
    <>
      <MediaQuery maxWidth={1279.9}>
        <ul className="relative z-10 text-text-white w-[181px] tab:w-[221px]  text-right flex flex-col gap-4   tab:gap-6 ">
          {data.chooseUpData.map(({ title, text }, ind) => (
            <li key={ind}>
              <h4 className={`text-sm font-normal mb-2 tab:text-base    } `}>
                {" "}
                {title}
              </h4>
              <p className=" text-xs_chose_us font-extralight  ">{text}</p>
            </li>
          ))}
        </ul>
      </MediaQuery>
      <MediaQuery minWidth={1280}>
        <div className="flex gap-6">
          <ul className="relative z-10 text-text-white  w-[285px] text-right flex flex-col   gap-12">
            {data.chooseUpData.map(({ title }, ind) => (
              <li key={ind}>
                <h4 className={` font-normal  text-kg    } `}> {title}</h4>
              </li>
            ))}
          </ul>
          <ul className="relative z-10 text-text-white w-[285px]   flex flex-col   gap-6 ">
            {data.chooseUpData.map(({ text }, ind) => (
              <li key={ind}>
                <p className=" text-xs_slogan font-extralight  ">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </MediaQuery>
    </>
  );
}
