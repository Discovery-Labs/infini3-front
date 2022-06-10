import { convertFontSizeToCSSVar } from "./utils/typography";
import {
  FormErrorMessage as ChakraFormErrorMessage,
  FormErrorMessageProps as ChakraFormErrorMessageProps,
  FormHelperText as ChakraFormHelperText,
  FormLabelProps as ChakraFormLabelprops,
  HelpTextProps as ChakraHelperTextProps,
  FormLabel as FormLabelText,
} from "@chakra-ui/react";
import {
  BodyBase,
  BodySizes,
  LabelBase,
  LabelSizes,
  TypographySize,
  fontWeights,
  letterSpacings,
  lineHeights,
} from "@discovery-dao/infini-ui";

export interface FormLabelProps extends Omit<ChakraFormLabelprops, "size"> {
  size?: LabelSizes;
}

export const FormLabel = ({
  size = "label.md",
  ...restProps
}: FormLabelProps) => {
  const [base] = size.split(".") as [LabelBase, TypographySize];

  return (
    <FormLabelText
      fontSize={convertFontSizeToCSSVar(size)}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};

export interface FormHelperTextProps
  extends Omit<ChakraHelperTextProps, "size"> {
  size?: BodySizes;
}

export const FormHelperText = ({
  size = "body.sm",
  ...restProps
}: FormHelperTextProps) => {
  const [base] = size.split(".") as [BodyBase, TypographySize];

  return (
    <ChakraFormHelperText
      fontSize={convertFontSizeToCSSVar(size)}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};

export interface FormErrorMessageProps
  extends Omit<ChakraFormErrorMessageProps, "size"> {
  size?: BodySizes;
}

export const FormErrorMessage = ({
  size = "body.sm",
  ...restProps
}: FormErrorMessageProps) => {
  const [base] = size.split(".") as [BodyBase, TypographySize];

  return (
    <ChakraFormErrorMessage
      fontSize={convertFontSizeToCSSVar(size)}
      fontWeight={fontWeights[base]}
      lineHeight={lineHeights[base]}
      letterSpacing={letterSpacings[base]}
      {...restProps}
    />
  );
};
