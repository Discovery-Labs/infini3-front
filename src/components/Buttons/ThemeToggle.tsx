import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = (props: any) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="outline"
      size="md"
      aria-label="theme toggle"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      {...props}
    />
  );
};

export default ThemeToggle;
