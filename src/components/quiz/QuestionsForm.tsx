import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  useAddress,
  useEdition,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useSigner,
} from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { FileInput } from "components/shared/FileInput";
import { DESIRED_CHAIN_ID } from "core/utils/constants";
import useMint from "hooks/useCreateMint";
import { useImageFileOrUrl } from "hooks/useImageFileOrUrl";
import { useRouter } from "next/router";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Heading } from "tw-components";
import useAuthenticate from "../../hooks/useAuthenticate";
import useCreateQuest from "../../hooks/useCreateQuest";
import ControlledSelect from "./ControlledSelect";
import OptionsFieldArray from "./OptionsFieldArray";

export default function Questions() {
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const signer = useSigner();
  const router = useRouter();
  const { login } = useAuthenticate();
  const { createQuest } = useCreateQuest();
  const { createMint } = useMint();
  const address = useAddress();
  const contractAddress = process.env.NEXT_PUBLIC_EDITION_ADDRESS || "";
  const contract = useEdition(contractAddress);
  const connectWithMetamask = useMetamask();
  const {
    watch,
    control,
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const bgColor = useColorModeValue("white", "gray.900");

  const { questions } = errors as any;

  const currentValues = watch();

  const { fields, append, remove, swap } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questions", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onSubmit = async (data: any) => {
    if (data.questions === undefined || data.questions.length === 0) {
      alert("Create a least 1 question");
      return;
    }

    if (!address) {
      connectWithMetamask();
      return;
    }

    if (isOnWrongNetwork && switchNetwork) {
      switchNetwork(DESIRED_CHAIN_ID);
      return;
    }

    const toastId = toast.loading("Uploading...", {
      position: "top-center",
      style: { backgroundColor: "#171923", color: "white" },
    });
    try {
      if (!data.image) {
        alert("Please upload a file.");
        return;
      }

      if (!address || !signer) {
        alert("Please connect to your wallet.");
        return;
      }

      await login();

      // Upload image to IPFS using the sdk.storage
      const tw = new ThirdwebSDK(signer);
      const ipfsHash = await tw.storage.upload(data.image);
      const imagePath = `${ipfsHash.uris[0]}`;

      // Create NFT Mint
      const signedPayload = await createMint({
        name: data.title,
        description: data.description,
        imagePath: imagePath,
      });
      if (!contract) return;
      const tx = await contract.signature.mint(signedPayload);
      data.tokenId = tx.id.toNumber();

      toast.success("Success!", {
        id: toastId,
      });
    } catch (err) {
      toast.error("Something went wrong :(", {
        id: toastId,
      });
      console.error(err);
      return;
    }
    // Create Quest in db
    const quest = await createQuest(data);
    if (quest.ok) {
      router.push("/");
    }
  };

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    //swap the fields
    swap(source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Toaster />
      <VStack w="full" align={"start"} spacing={2}>
        <form style={{ width: "inherit" }} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction={"column"} gap="2">
            <Flex
              flexShrink={0}
              flexGrow={1}
              maxW={{ base: "100%", md: "160px" }}
            >
              <FormControl display="flex" flexDirection="column">
                <FormLabel>Image</FormLabel>
                <FileInput
                  accept={{ "image/*": [] }}
                  value={useImageFileOrUrl(watch("image"))}
                  setValue={(file) =>
                    setValue("image", file, { shouldTouch: true })
                  }
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  transition="all 200ms ease"
                />
                <FormErrorMessage>
                  {questions && questions["image"]?.error?.message}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <FormControl id="title">
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                {...register("title", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                {...register("description", {
                  required: "This is required",
                })}
              />
            </FormControl>
            <FormControl id="tags">
              <FormLabel>Tags (Separate with comma)</FormLabel>
              <Input
                type="text"
                {...register("tags", {
                  required: "This is required",
                  maxLength: {
                    value: 20,
                    message: "Maximum length should be 20",
                  },
                })}
              />
            </FormControl>
          </Flex>

          <Divider bg="none" py="2" />
          <Droppable droppableId="droppable">
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="panels-wrapper"
              >
                {fields.map((field: any, index) => {
                  if (field.type === "guide")
                    return (
                      <Draggable
                        draggableId={field.id}
                        index={index}
                        key={field.id}
                      >
                        {(provided: any) => (
                          <VStack
                            w="full"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            bg={bgColor}
                            pt="8"
                          >
                            <HStack
                              {...provided.dragHandleProps}
                              w="full"
                              justify="start"
                              p={2}
                              borderRadius="md"
                              _hover={{
                                bgColor: "gray.800",
                              }}
                            >
                              <DragHandleIcon w={6} h={6} />
                              <Heading>{index + 1}: Guide</Heading>
                            </HStack>
                            <FormControl
                              isInvalid={
                                questions &&
                                questions[index] &&
                                !!questions[index].question
                              }
                            >
                              <HStack justify="space-between">
                                <FormLabel
                                  htmlFor={`questions[${index}].guide`}
                                >
                                  Guide
                                </FormLabel>
                                <Button
                                  colorScheme="secondary"
                                  variant="ghost"
                                  onClick={() => remove(index)}
                                  aria-label="remove"
                                  size="sm"
                                  px="10"
                                >
                                  Remove
                                </Button>
                              </HStack>
                              <Input
                                placeholder="Question here..."
                                {...register(`questions[${index}].guide`, {
                                  required: "This is required",
                                  maxLength: {
                                    value: 1200,
                                    message: "Maximum length should be 1200",
                                  },
                                })}
                              />
                              <FormErrorMessage>
                                {questions &&
                                  questions[index] &&
                                  questions[index].question &&
                                  questions[index].question.message}
                              </FormErrorMessage>
                            </FormControl>
                          </VStack>
                        )}
                      </Draggable>
                    );

                  return (
                    <Draggable
                      draggableId={field.id}
                      index={index}
                      key={field.id}
                    >
                      {(provided: any) => (
                        <VStack
                          w="full"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          bg={bgColor}
                          pt="8"
                        >
                          <HStack
                            {...provided.dragHandleProps}
                            w="full"
                            justify="start"
                            p={2}
                            borderRadius="md"
                            _hover={{
                              bgColor: "gray.800",
                            }}
                          >
                            <DragHandleIcon w={6} h={6} />
                            <Heading>{index + 1}: Question</Heading>
                          </HStack>
                          <FormControl
                            isInvalid={
                              questions &&
                              questions[index] &&
                              !!questions[index].question
                            }
                          >
                            <HStack justify="space-between">
                              <FormLabel
                                htmlFor={`questions[${index}].question`}
                              >
                                Question
                              </FormLabel>
                              <Button
                                colorScheme="secondary"
                                variant="ghost"
                                onClick={() => remove(index)}
                                aria-label="remove"
                                size="sm"
                                px="10"
                              >
                                Remove
                              </Button>
                            </HStack>
                            <Input
                              placeholder="Question here..."
                              {...register(`questions[${index}].question`, {
                                required: "This is required",
                                maxLength: {
                                  value: 200,
                                  message: "Maximum length should be 200",
                                },
                              })}
                            />
                            <FormErrorMessage>
                              {questions &&
                                questions[index] &&
                                questions[index].question &&
                                questions[index].question.message}
                            </FormErrorMessage>
                          </FormControl>

                          <FormControl
                            isInvalid={
                              questions &&
                              questions[index] &&
                              !!questions[index].options
                            }
                          >
                            <FormLabel htmlFor={`questions[${index}].options`}>
                              Options
                            </FormLabel>
                            <OptionsFieldArray
                              nestIndex={index}
                              {...{ control, register }}
                            />
                            <FormErrorMessage>
                              {questions &&
                                questions[index] &&
                                questions[index].options &&
                                questions[index].options.message}
                            </FormErrorMessage>
                          </FormControl>

                          <ControlledSelect
                            control={control}
                            name={`questions[${index}].answer`}
                            label="Correct answer(s)"
                            rules={{
                              required:
                                "At least one correct answer must be set.",
                              minLength: {
                                value: 1,
                                message:
                                  "At least one correct answer must be set.",
                              },
                            }}
                            options={
                              currentValues.questions[index]?.options?.length >
                              0
                                ? currentValues.questions[index].options.map(
                                    (opt: { value: string }) => ({
                                      label: opt.value,
                                      value: opt.value,
                                      colorScheme: "primary",
                                    })
                                  )
                                : []
                            }
                          />
                        </VStack>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Divider bg="none" py="5" />
          <HStack>
            <Button
              w="full"
              type="button"
              onClick={() => {
                append({
                  type: "guide",
                  guide: "",
                });
              }}
            >
              + New Guide
            </Button>
            <Button
              w="full"
              type="button"
              onClick={() => {
                append({
                  type: "question",
                  question: "",
                  options: [""],
                  answer: "",
                });
              }}
            >
              + New Question
            </Button>
          </HStack>

          <Flex w="full" pt="8" justify="space-between">
            <Button
              colorScheme="secondary"
              type="button"
              onClick={() => reset()}
            >
              Reset Form
            </Button>
            {address ? (
              <Button isLoading={isSubmitting} type="submit">
                Submit
              </Button>
            ) : (
              <Button onClick={connectWithMetamask}>Connect</Button>
            )}
          </Flex>
        </form>
      </VStack>
    </DragDropContext>
  );
}
