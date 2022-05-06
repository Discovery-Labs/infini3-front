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
  IconButton,
  Link,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import ConnectButton from "../Buttons/ConnectButton";
import ThemeToggle from "../Buttons/ThemeToggle";
import ScaffoldIcon from "../Icons/ScaffoldIcon";

const LinkItem = ({ href, children, ...props }: any) => {
  const { pathname } = useRouter();

  let isActive = false;
  if (href === pathname) {
    isActive = true;
  }

  return (
    <NextLink href={href}>
      <Link color={isActive ? "accent" : ""} {...props}>
        {children}
      </Link>
    </NextLink>
  );
};

const LinkItems = () => {
  return (
    <>
      <LinkItem href="/">Adventurers</LinkItem>
      <LinkItem href="/sponsors">Sponsors</LinkItem>
      <LinkItem href="/example">ExampleUI</LinkItem>
      <LinkItem href="/subgraph">Subgraph</LinkItem>
    </>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav" w="100%" top="0" zIndex={1}>
      <Container display="flex" p={2} maxW="7xl" alignItems="center">
        <HStack>
          <ScaffoldIcon size="36px" />
          <NextLink href="/">
            <Link
              display={{ base: "none", md: "flex" }}
              fontWeight="bold"
              color="accent"
              textTransform="uppercase"
              size="md"
            >
              Infini3
            </Link>
          </NextLink>
          <HStack px="2" spacing="4" display={{ base: "none", lg: "flex" }}>
            <LinkItems />
          </HStack>
        </HStack>

        <HStack marginLeft="auto">
          <ConnectButton />
          <ThemeToggle />
          <IconButton
            size="md"
            px="2"
            mr="2"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ lg: "none" }}
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
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : null}
    </Box>
  );
};

export default Navbar;
