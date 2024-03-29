import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  Link,
  useColorModeValue,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { ConnectWallet } from "@thirdweb-dev/react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect } from "react";
import { FiExternalLink } from "react-icons/fi";
import ThemeToggle from "../../components/Button/ThemeToggle";
React.useLayoutEffect = React.useEffect;

import { useAddress } from "@thirdweb-dev/react";
import useAuthenticate from "hooks/useAuthenticate";

const LinkItem = ({ href, children, ...props }: any) => {
  const { pathname } = useRouter();

  let isActive = false;
  if (href === pathname) {
    isActive = true;
  }

  return (
    <NextLink href={href}>
      <Link
        _hover={{ textDecoration: "none", color: "primary" }}
        color={isActive ? "accent" : ""}
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};
const LinkItems = () => {
  return (
    <>
      <LinkItem href="/">Adventure</LinkItem>
      <LinkItem href="/profile">Profile</LinkItem>
      <Link
        display="inline-flex"
        alignItems="center"
        gap="2"
        isExternal
        href="https://github.com/Discovery-Labs/"
        _hover={{ textDecoration: "none", color: "primary" }}
      >
        Github
        <Icon as={FiExternalLink} />
      </Link>
    </>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAddress();
  const { logout } = useAuthenticate();
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  useEffect(() => {
    if (!address) {
      logout();
    }
  }, [address]);

  return (
    <Box as="nav" w="100%" top="0" zIndex={1}>
      <Container display="flex" p={2} maxW="7xl" alignItems="center">
        <HStack>
          <NextLink href="/">
            <Link
              flex="none"
              fontWeight="bold"
              color="accent"
              textTransform="uppercase"
              size="md"
              _hover={{
                textDecoration: "none",
                color: "primary",
                transform: "rotate(-5deg)",
              }}
            >
              {isMobile ? "Quest" : "Quest"}
            </Link>
          </NextLink>
          <HStack px="2" spacing="4" display={{ base: "none", md: "flex" }}>
            <LinkItems />
          </HStack>
        </HStack>

        <HStack marginLeft="auto">
          <ConnectWallet colorMode={useColorModeValue("light", "dark")} />
          <ThemeToggle display={{ base: "none", md: "flex" }} />
          <IconButton
            size="md"
            px="2"
            mr="2"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Container>

      {isOpen ? (
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack onClick={onClose} align="start" fontSize="lg" spacing="4">
                <LinkItems />
                <ThemeToggle display={{ base: "flex", md: "none" }} />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default Navbar;
