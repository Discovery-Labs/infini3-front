import { convertFontSizeToCSSVar } from "./utils/typography";
import {
  Text as ChakraText,
  TextProps as ChakraTextProps,
} from "@chakra-ui/react";
import {
  TextBase,
  TextSizes,
  TypographySize,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "@discovery-dao/infini-ui";

export interface TextProps extends Omit<ChakraTextProps, "size"> {
  size?: TextSizes;
}

export const Text = ({ size = "body.md", ...restProps }: TextProps) => {
  const [base] = size.split(".") as [TextBase, TypographySize];

  return (
    <ChakraText
      fontSize={convertFontSizeToCSSVar(size)}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};
