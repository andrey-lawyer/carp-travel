import { iContainer } from "@/types/propsType";

export function Container({ children, noPaddingDesk = false }: iContainer) {
  return (
    <div
      className={` w-full mx-auto px-5 mob:w-[480px] tab:px-8 tab:w-[768px] desk:w-[1280px] ${
        noPaddingDesk ? "desk:p-0" : "desk:px-[24px]"
      } `}
    >
      {children}
    </div>
  );
}
