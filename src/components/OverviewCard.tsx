import {
  Box,
  Button,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Alchemy } from "alchemy-sdk";
import { ALCHEMY_SETTINGS } from "core/utils/constants";
import { constants } from "ethers";
import { Quiz } from "hooks/useQuiz";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heading } from "tw-components";
import { CompletedUserListModal } from "./Modal/CompletedUserListModal";

const OverviewCard = ({
  quiz,
  setIsOverview,
}: {
  quiz: Quiz;
  setIsOverview: Dispatch<SetStateAction<boolean>>;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adventurers, setAdventurers] = useState([""]);

  const tokenId = quiz.token_id;
  const questionsLengthOriginal = quiz.questions.length;

  const alchemy = new Alchemy(ALCHEMY_SETTINGS);
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";

  const getBalances = async () => {
    const addresses = (
      await alchemy.nft.getOwnersForNft(contractAddress, tokenId)
    ).owners.filter((addr) => addr !== constants.AddressZero);
    setAdventurers(addresses);
  };

  useEffect(() => {
    getBalances();
  }, []);

  const openModal = () => {
    getBalances();
    onOpen();
  };

  return (
    <VStack flex="1" justify="center" align={"center"} spacing={8}>
      <CompletedUserListModal
        isOpen={isOpen}
        onClose={onClose}
        adventurers={adventurers}
      />
      <Heading>{quiz.title}</Heading>
      <Text>{quiz.description}</Text>
      <Text>Quest length: {questionsLengthOriginal}</Text>
      <Box onClick={openModal}>
        <Text fontSize="small">
          <Link href="#">
            {adventurers.length} Adventurer(s) completed this quest
          </Link>
        </Text>
      </Box>

      <Text></Text>
      <Box pt={16}>
        <Button onClick={() => setIsOverview(false)}>Start</Button>
      </Box>
    </VStack>
  );
};
export default OverviewCard;
