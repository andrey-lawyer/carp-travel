import dynamic from "next/dynamic";
import { useState } from "react";
import { Link } from "react-scroll";

const MediaQuery = dynamic(() => import("react-responsive"), {
  ssr: false,
});

import { Portal } from "./Portal";
import { ModalMenu } from "./ModalMenu";
import nav from "@/data/nav.json";

export function Nav() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <MediaQuery maxWidth={767.9}>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-transparent text-text-white text-button-font"
        >
          MENU
        </button>
        {showModal && (
          <Portal>
            <ModalMenu setShowModal={setShowModal} />
          </Portal>
        )}
      </MediaQuery>
      <MediaQuery minWidth={768}>
        <nav>
          <ul className="flex gap-6 desk:gap-14">
            {nav.nav.map((item, ind) => (
              <li key={ind}>
                <Link
                  href="/"
                  activeClass="active"
                  to={`section_${ind + 1}`}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="bg-transparent text-text-white text-button-font cursor-pointer bg-red-500 hover:bg-red-600"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </MediaQuery>
    </>
  );
}