import { Flex, Heading } from "@chakra-ui/react"
import { Section } from "@/components/Section"
export const HeaderSection = () => {
  return (
    <Section as="header">
      <Flex direction="column" alignItems={["left", "center"]} gap="6">
        <Flex direction="column" alignItems={["left", "center"]} gap="1">
          <Heading
            as="h1"
            size="3xl"
            bgGradient="linear(to-tr, brand.600, brand.500)"
            bgClip="text"
            textAlign={["left", "center"]}
            fontWeight="800"
          >
            Create Next Component
          </Heading>
        </Flex>
      </Flex>
    </Section>
  )
}
