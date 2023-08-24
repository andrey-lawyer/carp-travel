import Image from "next/image";

import { Container } from "@/components/Container";
import { Nav } from "@/components/Nav";

export const Header = () => {
  return (
    <header className="absolute  w-screen pt-9 z-10">
      <Container>
        <div className="flex justify-between  align-middle ">
          <Image
            src="/images/logo.svg"
            alt="logo"
            className=""
            width={61}
            height={35}
            priority
          />

          <Nav />
        </div>
      </Container>
    </header>
  );
};
