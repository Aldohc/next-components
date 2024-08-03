import { Box, Flex } from "@chakra-ui/react"
import { Global, css } from "@emotion/react"
import { ComponentProps, FC } from "react"
import { Section } from "@/components/Section"
import { HeaderSection } from "./components/Header"
import { ComponentsForm } from "./components/ComponentsForm"

const globalStyles = css`
  body {
    background-color: #eee;
  }
`

const Card: FC<ComponentProps<typeof Box>> = (props) => (
  <Box
    width="100%"
    borderRadius={[30, 50]}
    padding={[30, 50, 70]}
    background="white"
    boxShadow="0 10px 50px rgba(0,0,0,0.1)"
    {...props}
  />
)

const LandingPageTemplate = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Flex direction="column" gap="16" alignItems="center" py="16">
        <HeaderSection />
        <Flex
          as="main"
          direction="column"
          gap="16"
          alignItems="center"
          width="100%"
        >
          <Section>
          </Section>
          <Section>
            <Card>
              <ComponentsForm />
            </Card>
          </Section>
        </Flex>
      </Flex>
    </>
  )
}

export default LandingPageTemplate
