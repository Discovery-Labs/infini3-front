import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as LocationLink, useMatch } from "@tanstack/react-location";
import _NextLink, { LinkProps as _NextLinkProps } from "next/link";
import React from "react";

interface LinkProps
  extends Omit<ChakraLinkProps, "href">,
    Pick<_NextLinkProps, "href"> {
  isExternal?: boolean;
  noIcon?: true;
  href: string;
}

/**
 * A link component that can be used to navigate to other pages.
 * Combines the `NextLink` and Chakra `Link` components.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => {
    const match = useMatch();
    const { href, isExternal, children, ...restLinkProps } = props;
    if (isExternal) {
      return (
        <ChakraLink isExternal href={href} ref={ref} {...restLinkProps}>
          {children}
        </ChakraLink>
      );
    }

    // we're in a react location context, so we can use that
    if (match) {
      return (
        <ChakraLink as={LocationLink} to={href} {...restLinkProps}>
          {children}
        </ChakraLink>
      );
    }
    return (
      <_NextLink href={href} passHref>
        <ChakraLink ref={ref} _focus={{ boxShadow: "none" }} {...restLinkProps}>
          {children}
        </ChakraLink>
      </_NextLink>
    );
  }
);

Link.displayName = "Link";
