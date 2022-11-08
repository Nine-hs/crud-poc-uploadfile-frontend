import {
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

const BasicUsage = ({isOpen, onClose, children}) => {
  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
         {children}
      </Modal>
    </>
  );
};

export default BasicUsage;
