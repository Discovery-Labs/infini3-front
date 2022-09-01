import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
import {
  useAddress,
  useEdition,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { DESIRED_CHAIN_ID } from "core/utils/constants";
import useMint from "hooks/useCreateMint";
import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { Heading } from "tw-components";
import useAuthenticate from "../../hooks/useAuthenticate";
import useCreateQuest from "../../hooks/useCreateQuest";
import ControlledSelect from "./ControlledSelect";
import OptionsFieldArray from "./OptionsFieldArray";

export default function Questions() {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
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
    formState: { errors, isSubmitting },
  } = useForm();

  const { questions } = errors as any;

  const currentValues = watch();

  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questions", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const onSubmit = async (data: any) => {
    if (data.questions === undefined || data.questions.length === 0) {
      alert("Create a least 1 question");
      return;
    }

    if (isMismatched && switchNetwork) {
      switchNetwork(DESIRED_CHAIN_ID);
    }
    await login();

    // Create NFT Mint
    const signedPayload = await createMint({
      name: data.title,
      description: data.description,
    });

    try {
      if (!contract) return;

      const tx = await contract.signature.mint(signedPayload);
      data.tokenId = tx.id;
    } catch (err) {
      console.error(err);
      return;
    }

    // Create Quest in db
    const quest = await createQuest(data);
    if (quest.ok) {
      router.push("/");
    }
  };

  return (
    <VStack w="full">
      <form style={{ width: "inherit" }} onSubmit={handleSubmit(onSubmit)}>
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

        <Divider bg="none" py="5" />
        {fields.map((item: any, index) => {
          if (item.type === "guide")
            return (
              <VStack w="full" pt="8" key={item.id}>
                <Heading>{index + 1}: Guide</Heading>
                <FormControl
                  isInvalid={
                    questions && questions[index] && !!questions[index].question
                  }
                >
                  <HStack justify="space-between">
                    <FormLabel htmlFor={`questions[${index}].guide`}>
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
            );

          return (
            <VStack w="full" pt="8" key={item.id}>
              <Heading>{index + 1}: Question</Heading>
              <FormControl
                isInvalid={
                  questions && questions[index] && !!questions[index].question
                }
              >
                <HStack justify="space-between">
                  <FormLabel htmlFor={`questions[${index}].question`}>
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
                  questions && questions[index] && !!questions[index].options
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
                  required: "At least one correct answer must be set.",
                  minLength: {
                    value: 1,
                    message: "At least one correct answer must be set.",
                  },
                }}
                options={
                  currentValues.questions[index]?.options?.length > 0
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
          );
        })}

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
          <Button colorScheme="secondary" type="button" onClick={() => reset()}>
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
  );
}
