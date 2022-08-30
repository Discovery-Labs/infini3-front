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
  correct: number;
  answered: number;
}

export const NotSuccessModal = ({
  isOpen,
  onClose,
  resetQuiz,
  correct,
  answered,
}: NotSuccessModalProps) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}> */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Unfortunately, you haven&apos;t passed the quiz
          </ModalHeader>
          <ModalBody pb={6}>
            <Text>
              You answer that correctly {correct}/{answered}
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
