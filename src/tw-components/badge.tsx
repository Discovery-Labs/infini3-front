import { Text } from "./text";
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
  LightMode,
  forwardRef,
} from "@chakra-ui/react";
import { TextSizes } from "@discovery-dao/infini-ui";

export interface BadgeProps extends ChakraBadgeProps {
  size?: TextSizes;
}

export const Badge = forwardRef<BadgeProps, "span">(
  ({ py = 1, children, size = "label.md", ...props }, ref) => {
    if (props.colorScheme && props.variant && props.variant === "outline") {
      return (
        <LightMode>
          <ChakraBadge py={py} {...props} ref={ref}>
            <Text color="inherit" size={size}>
              {children}
            </Text>
          </ChakraBadge>
        </LightMode>
      );
    }
    return (
      <ChakraBadge py={py} {...props} ref={ref}>
        <Text color="inherit" size={size}>
          {children}
        </Text>
      </ChakraBadge>
    );
  }
);

Badge.displayName = "Badge";
