import { Flex, Text } from "@chakra-ui/react"
import { Anchor } from "@/components/Anchor"
import { ExternalLinkIcon } from "./icons/ExternalLinkIcon"

export const Description = () => {
  return (
    <Flex direction="column" maxWidth="600" gap="4">
      <Text>
        <b>Create Next Stack</b> is a website and CLI tool used to easily set up
        the boilerplate of new{" "}
        <Anchor href="https://nextjs.org" isExternal>
          Next.js <ExternalLinkIcon mx="2px" />
        </Anchor>{" "}
        apps.
      </Text>
      <Text>
        Where{" "}
        <Anchor
          href="https://nextjs.org/docs/api-reference/create-next-app"
          isExternal
        >
          Create Next App <ExternalLinkIcon mx="2px" />
        </Anchor>{" "}
        lets you choose a single template only, Create Next Stack lets you pick
        and choose an array of technologies often used alongside Next.js,
        freeing you of the pain of making them work together.
      </Text>
    </Flex>
  )
}
