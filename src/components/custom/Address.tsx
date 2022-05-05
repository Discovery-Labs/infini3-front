import { useClipboard } from "@chakra-ui/hooks";
import { Box, Flex, HStack } from "@chakra-ui/layout";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonCircle,
  SkeletonText,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import useCustomColor from "core/hooks/useCustomColor";
import Blockies from "react-blockies";
import { MdCheckCircle, MdContentCopy, MdExitToApp } from "react-icons/md";
import { RiExternalLinkFill } from "react-icons/ri";
import { useAccount, useDisconnect, useEnsName } from "wagmi";

function Address({
  size = "long",
  blockExplorer,
  minimized = false,
  onChange,
  fontSize,
  blockiesScale,
}: {
  size?: "long" | "short";
  blockExplorer?: string;
  minimized?: boolean;
  onChange?: any;
  fontSize?: string;
  blockiesScale?: number;
}) {
  const blockExplorerLink = (address: string, explorer?: string) =>
    `${explorer || "https://etherscan.io/"}${"address/"}${address}`;
  const { disconnect } = useDisconnect();
  const { data: account, isLoading } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { hasCopied, onCopy } = useClipboard(account?.address || "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { coloredText } = useCustomColor();
  if (!account?.address || isLoading) {
    return (
      <Box padding="6" as="span">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
      </Box>
    );
  }

  let displayAddress = account.address.substr(0, 6);

  const ensSplit = ensName && ensName.split(".");
  const validEnsCheck = ensSplit && ensSplit[ensSplit.length - 1] === "eth";
  if (validEnsCheck) {
    displayAddress = ensName;
  } else if (size === "short") {
    displayAddress += "..." + account.address.substr(-4);
  } else if (size === "long") {
    displayAddress = account.address;
  }

  const etherscanLink = blockExplorerLink(account.address, blockExplorer);
  if (minimized) {
    return (
      <Box as="span" verticalAlign="middle">
        <Link target="_blank" href={etherscanLink} rel="noopener noreferrer">
          <Blockies
            seed={account.address.toLowerCase()}
            className="blockies"
            size={8}
            scale={2}
          />
        </Link>
      </Box>
    );
  }

  let text;
  if (onChange) {
    text = (
      <Editable placeholder={account.address}>
        <EditablePreview width="100%" />
        <Link target="_blank" href={etherscanLink} rel="noopener noreferrer">
          <EditableInput value={displayAddress} onChange={onChange} />
        </Link>
      </Editable>
    );
  } else {
    text = (
      <Flex
        display={["none", "none", "flex"]}
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
      >
        <Link
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
          textOverflow={displayAddress.startsWith("0x") ? "ellipsis" : "unset"}
          href={etherscanLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiExternalLinkFill />
          {displayAddress}
        </Link>
      </Flex>
    );
  }

  return (
    <HStack
      layerStyle="solid-card"
      py="1"
      px="2"
      _hover={{ bg: "lighten(0.2)" }}
      fontSize={fontSize ?? 28}
    >
      <Flex _hover={{ cursor: "pointer" }} onClick={onOpen}>
        <Blockies
          className="blockies"
          seed={account.address.toLowerCase()}
          size={6}
          scale={blockiesScale ? blockiesScale / 7 : 4.9}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Connected with MetaMask
            <Text textStyle="small" color={coloredText}>
              You can copy the address or view on explorer
            </Text>
            <HStack
              my="8"
              layerStyle="solid-card"
              py="1"
              px="2"
              justify="start"
            >
              <Flex alignItems="center" justifyContent="center" flexGrow={1}>
                <Link
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="none"
                  textOverflow={
                    displayAddress.startsWith("0x") ? "ellipsis" : "unset"
                  }
                  href={etherscanLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiExternalLinkFill />
                  {displayAddress}
                </Link>
              </Flex>
              <IconButton
                size="sm"
                variant="ghost"
                onClick={onCopy}
                aria-label="Copy Address"
                fontSize={fontSize}
                icon={
                  hasCopied ? (
                    <Icon color="aqua.300" as={MdCheckCircle} />
                  ) : (
                    <MdContentCopy />
                  )
                }
              />
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button
              w="full"
              onClick={() => disconnect()}
              rightIcon={<MdExitToApp />}
            >
              Disconnect
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {text}
      <IconButton
        size="sm"
        variant="ghost"
        onClick={onCopy}
        aria-label="Copy Address"
        fontSize={fontSize}
        icon={
          hasCopied ? (
            <Icon color="aqua.300" as={MdCheckCircle} />
          ) : (
            <MdContentCopy />
          )
        }
      />
    </HStack>
  );
}

export default Address;
