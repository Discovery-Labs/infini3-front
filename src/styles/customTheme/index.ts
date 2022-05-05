import { extendTheme } from "@chakra-ui/react";
import { customTheme } from "@discovery-dao/ui";

import fonts from "./fonts";

const myTheme = {
  ...customTheme,
  fonts,
};

const theme = extendTheme(myTheme);

export default theme;
