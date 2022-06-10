import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";
import {
  fontWeights,
  HeadingBase,
  HeadingSizes,
  letterSpacings,
  lineHeights,
  TypographySize,
} from "@discovery-dao/infini-ui";
import { convertFontSizeToCSSVar } from "./utils/typography";

export interface HeadingProps extends Omit<ChakraHeadingProps, "size"> {
  size?: HeadingSizes;
}

export const Heading = ({ size = "title.lg", ...restProps }: HeadingProps) => {
  const [base] = size.split(".") as [HeadingBase, TypographySize];

  return (
    <ChakraHeading
      fontSize={convertFontSizeToCSSVar(size)}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};
