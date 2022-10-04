import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface NotSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetQuiz: () => void;
  corrects: number;
  totalAnswered: number;
}

export const NotSuccessModal = ({
  isOpen,
  onClose,
  resetQuiz,
  corrects,
  totalAnswered,
}: NotSuccessModalProps) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}> */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Unfortunately, you haven&apos;t passed the quiz.
          </ModalHeader>
          <ModalBody pb={6}>
            <Text>
              You answer correctly: {corrects}/{totalAnswered}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={resetQuiz}>
              Try again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
