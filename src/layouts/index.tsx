import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
// import BottomBar from "./BottomBar";
// import Footer from "./Footer";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Flex direction="column" minH="calc(100vh - 56px)">
        {children}
      </Flex>
      {/* <Footer /> */}
      {/* <BottomBar /> */}
    </>
  );
};

export default Layout;
