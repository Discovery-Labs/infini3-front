import {
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps as ChakraDrawerProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalHeaderProps,
  useBreakpointValue,
} from "@chakra-ui/react";

export interface DrawerProps extends Omit<ChakraDrawerProps, "placement"> {
  header?: ModalHeaderProps;
  drawerBodyProps?: ModalBodyProps;
  footer?: ModalFooterProps;
  hideCloseButton?: true;
}

export const Drawer = ({
  children,
  header,
  drawerBodyProps,
  footer,
  hideCloseButton,
  ...restDrawerProps
}: DrawerProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <ChakraDrawer
      {...restDrawerProps}
      allowPinchZoom
      preserveScrollBarGap
      placement={isMobile ? "bottom" : "right"}
    >
      <DrawerOverlay zIndex="modal" />
      <DrawerContent
        maxH="calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
        // maxW="calc(100vw - env(safe-area-inset-left) - env(safe-area-inset-right))"
        overflow="hidden"
        borderTopRadius={{ base: "lg", md: "none" }}
      >
        {!hideCloseButton && <DrawerCloseButton />}
        {header && (
          <>
            <DrawerHeader {...header} />
            <Divider borderColor="borderColor" />
          </>
        )}
        <DrawerBody {...drawerBodyProps} py={4}>
          {children}
        </DrawerBody>
        {footer && (
          <>
            <Divider borderColor="borderColor" />
            <DrawerFooter {...footer} />
          </>
        )}
      </DrawerContent>
    </ChakraDrawer>
  );
};
