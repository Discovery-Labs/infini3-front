import { Box, Flex } from "@chakra-ui/react";
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
      <Box margin="0 auto" maxWidth="7xl" transition="0.5s ease-out">
        <Flex minH="calc(100vh - 56px)">
          <Box
            w="full"
            h="auto"
            marginY={{ base: 4, md: 16 }}
            marginX={{ base: 2, md: 4 }}
          >
            <Box as="main" h="full">
              {children}
            </Box>
          </Box>
        </Flex>
        {/* <Footer /> */}
      </Box>
      {/* <BottomBar /> */}
    </>
  );
};

export default Layout;
