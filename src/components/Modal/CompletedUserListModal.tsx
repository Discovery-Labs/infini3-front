import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface CompletedUserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  adventurers: string[];
}

export const CompletedUserListModal = ({
  isOpen,
  onClose,
  adventurers,
}: CompletedUserListModalProps) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            All the adventurers that completed the quest.
          </ModalHeader>
          <ModalBody pb={6}>
            {adventurers.map((user) => {
              return (
                <Box key={user}>
                  <Text>
                    <Link target="_blank" href={`https://rainbow.me/${user}`}>
                      {user}
                    </Link>
                  </Text>
                </Box>
              );
            })}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
