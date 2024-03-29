import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  ThirdwebNftMedia,
  useAddress,
  useEdition,
  useMetamask,
} from "@thirdweb-dev/react";
import QuestCard from "components/QuestCard";
import { OPENSEA_BASE_URL } from "core/utils/constants";
import useAuthenticate from "hooks/useAuthenticate";
import useProfile from "hooks/useProfile";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

const Profile = () => {
  const {
    user,
    isLoading: isProfileLoading,
    mutate,
    editProfile,
  } = useProfile();
  const address = useAddress();
  const { login, authenticate } = useAuthenticate();
  const connectWithMetamask = useMetamask();
  const [isEdit, setIsEdit] = useState(false);
  const boxBgColor = useColorModeValue("white", "gray.900");
  const grayTextColor = useColorModeValue("gray.700", "gray.400");
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const [ownedNfts, setOwnedNfts] = useState<Array<any>>();

  const loadNft = useCallback(async () => {
    if (contract && address) {
      const nfts = await contract?.getOwned(address);
      setOwnedNfts(nfts);
    }
  }, [contract]);

  useEffect(() => {
    loadNft();
  }, [loadNft]);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const isUserConnected = async () => {
    if (!address) {
      await connectWithMetamask();
    } else {
      setTimeout(async () => {
        await login();
      }, 1000);
    }

    // const res = await authenticate();
    // if (!res.ok) {
    //   await login();
    // }

    mutate(`/api/profile`);
  };
  useEffect(() => {
    isUserConnected();
  }, [address]);

  const onSubmit = async (data: any) => {
    if (!address) {
      await connectWithMetamask();
      await login();
    }

    const res = await authenticate();
    if (!res.ok) {
      await login();
    }

    // const profileData = { ...data, address: address };
    const user = await editProfile(data);

    if (user.ok) {
      mutate(`/api/profile`);
      setIsEdit(false);
    }
  };

  if (isProfileLoading) {
    return (
      <VStack flex="1" justify="start" align="center">
        <Container maxW="container.lg">
          <Flex justify="center">
            <Skeleton height="sm" fadeDuration={1}></Skeleton>
          </Flex>
        </Container>
      </VStack>
    );
  }

  return (
    <VStack flex="1" justify="start" align="center">
      <Container maxW="container.lg">
        <Flex justify="center">
          <Center py={6}>
            {isEdit ? (
              <form
                style={{ width: "inherit" }}
                onSubmit={() => handleSubmit(onSubmit)}
              >
                <Box
                  maxW={"320px"}
                  w={"full"}
                  bg={boxBgColor}
                  boxShadow={"2xl"}
                  rounded={"lg"}
                  p={6}
                  textAlign={"center"}
                >
                  <Avatar
                    size={"xl"}
                    src={
                      "https://images.unsplash.com/photo-1529946825183-536c6317f60e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=763&q=80"
                    }
                    mb={4}
                    pos={"relative"}
                  />
                  <FormControl id="username">
                    <FormLabel>username</FormLabel>
                    <Input
                      type="text"
                      placeholder={user?.username || ""}
                      {...register("username")}
                    />
                  </FormControl>

                  <Text fontWeight={600} color={"gray.500"} mb={4}>
                    {user?.address}
                  </Text>

                  <FormControl id="bio">
                    <FormLabel>bio</FormLabel>
                    <Input
                      type="text"
                      placeholder={user?.bio || ""}
                      {...register("bio")}
                    />
                  </FormControl>

                  <Flex justify={"space-around"} align={"center"}>
                    <Text>{user?.completed_quests?.length} ⭐️</Text>
                    <Text>{user?.experience} 🔥</Text>
                  </Flex>

                  <Flex mt={8} direction={"row"} gap={8}>
                    <Button
                      flex={1}
                      rounded={"md"}
                      bgColor={"red.400"}
                      onClick={() => setIsEdit(!isEdit)}
                    >
                      Cancel
                    </Button>
                    <Button
                      rightIcon={<EditIcon />}
                      flex={1}
                      rounded={"md"}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Box>
              </form>
            ) : (
              <Box
                maxW={"320px"}
                w={"full"}
                bg={boxBgColor}
                boxShadow={"2xl"}
                rounded={"lg"}
                p={6}
                textAlign={"center"}
              >
                <Avatar
                  size={"xl"}
                  src={
                    "https://images.unsplash.com/photo-1529946825183-536c6317f60e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=763&q=80"
                  }
                  mb={4}
                  pos={"relative"}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {user?.username}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} mb={4}>
                  {user?.address}
                </Text>

                <Text textAlign={"center"} color={grayTextColor} px={3}>
                  {user?.bio}
                </Text>

                <Flex justify={"space-around"} align={"center"}>
                  <Text>{user?.completed_quests?.length} ⭐️</Text>
                  <Text>{user?.experience} 🔥</Text>
                </Flex>

                <Flex mt={8} direction={"row"}>
                  <Button
                    rightIcon={<EditIcon />}
                    flex={1}
                    rounded={"md"}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit Profile
                  </Button>
                </Flex>
              </Box>
            )}
          </Center>
        </Flex>

        {ownedNfts && (
          <>
            <Center bg="accent" p={4} borderRadius={"md"}>
              <Text textColor="primary" fontWeight={"bold"}>
                Your badges
              </Text>
            </Center>
            <SimpleGrid
              justifyItems="center"
              py={8}
              columns={[1, 2, 3]}
              spacing="40px"
            >
              {ownedNfts?.reverse().map((nft: any, index: any) => (
                <VStack key={index}>
                  <Tooltip label={nft.metadata.description}>
                    <Link
                      href={`${OPENSEA_BASE_URL}${contractAddress}/${nft.metadata.id.toString()}`}
                    >
                      <Box
                        border="2px solid #6F3FF5"
                        borderRadius="full"
                        w="fit-content"
                        h="fit-content"
                        p="2"
                      >
                        <ThirdwebNftMedia
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "50%",
                          }}
                          metadata={nft.metadata}
                        />
                      </Box>
                    </Link>
                  </Tooltip>
                  <Text>{nft.metadata.name}</Text>
                </VStack>
              ))}
            </SimpleGrid>
          </>
        )}

        <Center bg="accent" p={4} borderRadius={"md"}>
          <Text textColor="primary" fontWeight={"bold"}>
            Your quests
          </Text>
        </Center>
        <SimpleGrid py={8} columns={[1, 2, 3]} spacing="40px">
          {user?.quests?.map((quest) => (
            <>
              <QuestCard key={quest.id} quest={quest} />
            </>
          ))}
        </SimpleGrid>
      </Container>
    </VStack>
  );
};

export default Profile;
