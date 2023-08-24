import { PropsWithChildren, ReactNode } from "react";

export interface IModal {
    setShowModal: (show: boolean) => void;
  }
  
  export interface ICareer {
    type?: "career" | "contacts";
  }

  export interface PortalProps {
    children: ReactNode;
  }

  export interface iContainer extends PropsWithChildren{
    noPaddingDesk? :boolean;
  }