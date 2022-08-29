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
  Skeleton,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import useAuthenticate from "hooks/useAuthenticate";
import useProfile from "hooks/useProfile";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

const Profile = () => {
  const { user, isLoading, mutate, editProfile } = useProfile();
  const address = useAddress();
  const { login, authenticate } = useAuthenticate();
  const connectWithMetamask = useMetamask();
  const [isEdit, setIsEdit] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();

  const isUserConnected = async () => {
    if (!address) {
      await connectWithMetamask();
      await login();
    }

    const res = await authenticate();
    if (!res.ok) {
      await login();
    }

    mutate(`/api/profile`);
  };
  useEffect(() => {
    isUserConnected();
  }, [address]);

  const onSubmit = async (data: any) => {
    console.log(data);
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

  if (isLoading) {
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
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box
                  maxW={"320px"}
                  w={"full"}
                  bg={useColorModeValue("white", "gray.900")}
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
                    alt={"Avatar Alt"}
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
                bg={useColorModeValue("white", "gray.900")}
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
                  alt={"Avatar Alt"}
                  mb={4}
                  pos={"relative"}
                />
                <Heading fontSize={"2xl"} fontFamily={"body"}>
                  {user?.username}
                </Heading>
                <Text fontWeight={600} color={"gray.500"} mb={4}>
                  {user?.address}
                </Text>

                <Text
                  textAlign={"center"}
                  color={useColorModeValue("gray.700", "gray.400")}
                  px={3}
                >
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
      </Container>
    </VStack>
  );
};

export default Profile;
