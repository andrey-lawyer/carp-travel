import Image from "next/image";

import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";

export const Header = () => {
  return (
    <header className="absolute  w-screen pt-9 z-10">
      <Container>
        <div className="flex justify-between  align-middle ">
          <a href="https://uk-ua.facebook.com/" aria-label="logo" target="_blank" rel="noopener noreferrer nofollow" >
            <Image
              src="/images/logo.svg"
              alt="logo"
              className=""
              width={61}
              height={35}
              priority
            />
          </a>
          <Nav />
        </div>
      </Container>
    </header>
  );
};
