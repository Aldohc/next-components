import {
  Button,
  Code,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { ComponentProps, FC, useEffect, useState } from "react"
import { CheckIcon } from "./icons/CheckIcon"

type PopupProps = Omit<ComponentProps<typeof Modal>, "children"> & {
  command: string
}
export const CommandModal: FC<PopupProps> = ({
  command,
  isOpen,
  onClose,
  ...rest
}) => {
  const [hasCopied, setHasCopied] = useState(false)
  const [size, setSize] = useState('xl')

  useEffect(() => {
    setHasCopied(false)
  }, [isOpen])

  const [copyFailed, setCopyFailed] = useState(false)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setHasCopied(true)
    } catch (error) {
      setCopyFailed(true)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size} {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Almost there...</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap="4">
            <Text>Run the following command in your terminal:</Text>
            <Code padding="4" background="gray.100">
              {command}
            </Code>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {!copyFailed && (
            <Button
              colorScheme={"messenger"}
              flexGrow={1}
              onClick={handleCopyClick}
            >
              {hasCopied ? <CheckIcon /> : <>Copy</>}
            </Button>
          )}
          {copyFailed && (
            <Text color="red.500" fontSize="sm">
              Failed to copy to clipboard. You will need to copy it manually.
            </Text>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
