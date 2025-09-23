import { FC } from 'react';
import { Link } from 'react-scroll';

import { Container } from './Container';
import nav from '@/data/nav.json';

import { IModal } from '@/types/propsType';

export const ModalMenu: FC<IModal> = ({ setShowModal }) => {
  return (
    <div className="w-[100%] h-[100%] bg-[rgba(1, 10, 5, 0.75)] backdrop-blur-[25px] pt-[43px]">
      <Container>
        <button
          type="button"
          className="block text-text-white text-button-font ml-auto"
          onClick={() => setShowModal(false)}
        >
          CLOSE
        </button>
        <nav>
          <ul className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-12 items-center">
            {nav.nav.map((item, ind) => (
              <li key={ind}>
                <Link
                  activeClass="active"
                  to={`section_${ind === 2 ? 0 : ind + 1}`}
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                  onSetActive={() => setShowModal(false)}
                  className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-text-white text-lg_modal tracking-[1.8px] cursor-pointer"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </div>
  );
};