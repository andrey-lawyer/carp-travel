"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { PortalProps } from "@/types/propsType";

export const Portal = (props: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#modal");
    console.log(ref.current, "6");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className="fixed top-0 left-0 w-[100%] h-[100%] z-20 overflow-y-hidden">
          {props.children}
        </div>,
        ref.current
      )
    : null;
};
