import {
  Button,
  CheckboxGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
} from "@chakra-ui/react"
import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Checkbox } from "@/components/Checkbox"
import { capitalizeFirstCharacter } from "@/utils/capitalizeFirstCharacter"
import { objectToKeyToKeyMap } from "@/utils/objectToKeyToKeyMap"
import { CommandModal } from "./CommandModal"
import { WithInfoIconAndTooltip } from "./InfoIconTooltip"

type OptionKey =
  | "index"
  | "constant"
  | "hooks"
  | "schema"
  | "type"

const options = {
  index: { key: "index", value: "i", label: "View" },
  constant: { key: "constant", value: "c", label: "Constant" },
  hooks: { key: "hooks", value: "h", label: "Hook" },
  schema: { key: "schema", value: "s", label: "Schema" },
  type: { key: "type", value: "t", label: "Type" },
} satisfies {
  [Key in OptionKey]: {
    key: Key
    value: string
    label: string
  }
}

const optionKeys = objectToKeyToKeyMap(options)

const formattingOptionKeys = [
  optionKeys.index,
  optionKeys.constant,
  optionKeys.hooks,
  optionKeys.schema,
  optionKeys.type,
] satisfies OptionKey[]

type RootFolder = string
type ProjectName = string
type ViewFolder = string
type Formatting = (typeof formattingOptionKeys)[number]

type ComponentsFormData = {
  rootFolder: RootFolder
  projectName: ProjectName
  viewFolder: ViewFolder,
  formatting: Formatting[]
}
const defaultFormData: ComponentsFormData = {
  rootFolder: "features",
  projectName: "my-feature",
  viewFolder: "FeatureList",
  formatting: [optionKeys.index, optionKeys.constant, optionKeys.hooks, optionKeys.schema, optionKeys.type],
}

const formDataKeys = objectToKeyToKeyMap(defaultFormData)

const categoryLabels = {
  rootFolder: "Root Folder",
  projectName: "Parent Folder",
  viewFolder: "Component Name",
  formatting: "File",
} as const

export const ComponentsForm: React.FC = () => {
  const { register, control, watch, formState, handleSubmit } =
    useForm<ComponentsFormData>({
      defaultValues: defaultFormData,
    })

  const { errors } = formState

  const [isCommandModalShow, setIsModalShown] = React.useState(false)
  const [command, setCommand] = React.useState("")

  const handleSuccessfulSubmit: SubmitHandler<ComponentsFormData> = (
    formData
  ) => {
    const calculateCommand = (formData: ComponentsFormData) => {
      const args = []

      const path = `${formData.rootFolder}/${formData.projectName}/views`;

      args.push(`new-component ${formData.viewFolder} -d ${path}`)

      const pushArgs = (selectedOptionKeys: OptionKey[]) => {
        // Check if 'schema' is selected
        const schemaSelected = selectedOptionKeys.includes('schema')

        if (!schemaSelected && selectedOptionKeys.length >= 4) {
          // If 'schema' is not selected, push '-all'
          args.push('-all')
        } else if (schemaSelected && selectedOptionKeys.length === 5) {
          // Otherwise, push individual options
          selectedOptionKeys.forEach(optionKey => {
            if (optionKey === 'schema') {
              args.push(`-all -s`)
            }
          })
        } else {
          // Add '-all' for all other options
          const otherOptions = formattingOptionKeys.filter(key => key !== 'schema')
          selectedOptionKeys.forEach(optionKey => {
            args.push(`-${options[optionKey].value}`)
          })
        }
      }

      pushArgs(formData.formatting)

      const projectNameSegments = formData.projectName.split("/")

      return args.join(" ")
    }
    setCommand(calculateCommand(formData))
    setIsModalShown(true)
  }

  const CheckboxesOfOptionKeys = (
    name:
      | "formatting",
    optionKeys: Array<keyof typeof options>,
    validators?: {
      [key in keyof typeof options]?: Array<{
        isInvalid: boolean
        errorMessage: string
      }>
    }
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...rest } }) => (
          <CheckboxGroup {...rest}>
            <Flex direction="column" gap="3">
              {optionKeys.map((optionKey) => (
                <FormControl
                  key={optionKey}
                  isInvalid={validators?.[optionKey]?.some(
                    (validator) => validator.isInvalid
                  )}
                >
                  <Checkbox value={optionKey}>
                    {options[optionKey].label}
                  </Checkbox>
                  {validators?.[optionKey]?.map(
                    (validator) =>
                      validator.isInvalid && (
                        <FormErrorMessage key={validator.errorMessage}>
                          {validator.errorMessage}
                        </FormErrorMessage>
                      )
                  )}
                </FormControl>
              ))}
            </Flex>
          </CheckboxGroup>
        )}
      />
    )
  }

  return (
    <>
      <CommandModal
        isOpen={isCommandModalShow}
        command={command}
        onClose={() => {
          setIsModalShown(false)
        }}
      />
      <form onSubmit={handleSubmit(handleSuccessfulSubmit)}>
        <Heading as="h2" size="lg" marginBottom="6">
          Create your components
        </Heading>


        <Flex direction="column" gap="16">
          <Flex direction={["column", "column", "row"]} gap={["8", "8", "16"]}>
            <Flex direction="column" gap="8" flexBasis="100%">

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md" gap="8px">
                  <WithInfoIconAndTooltip
                      tooltip={`Project names must be valid npm package names.`}
                  >
                    {categoryLabels.rootFolder}
                  </WithInfoIconAndTooltip>
                </Heading>
                <FormControl isInvalid={errors?.rootFolder?.message != null}>
                  <Input
                      {...register(formDataKeys.rootFolder, {
                      })}
                  />
                  {errors.rootFolder?.message != null ? (
                      <FormErrorMessage>
                        {capitalizeFirstCharacter(errors.rootFolder.message) +
                            "."}
                      </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Flex>
              <Flex direction="column" gap="4">
                <Heading as="h3" size="md" gap="8px">
                  <WithInfoIconAndTooltip
                    tooltip={`Project names must be valid npm package names.`}
                  >
                    {categoryLabels.projectName}
                  </WithInfoIconAndTooltip>
                </Heading>
                <FormControl isInvalid={errors?.projectName?.message != null}>
                  <Input
                    {...register(formDataKeys.projectName, {
                    })}
                  />
                  {errors.projectName?.message != null ? (
                    <FormErrorMessage>
                      {capitalizeFirstCharacter(errors.projectName.message) +
                        "."}
                    </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Flex>
              <Flex direction="column" gap="4">
                <Heading as="h3" size="md" gap="8px">
                  <WithInfoIconAndTooltip
                      tooltip={`Project names must be valid npm package names.`}
                  >
                    {categoryLabels.viewFolder}
                  </WithInfoIconAndTooltip>
                </Heading>
                <FormControl isInvalid={errors?.viewFolder?.message != null}>
                  <Input
                      {...register(formDataKeys.viewFolder, {
                      })}
                  />
                  {errors.viewFolder?.message != null ? (
                      <FormErrorMessage>
                        {capitalizeFirstCharacter(errors.viewFolder.message) +
                            "."}
                      </FormErrorMessage>
                  ) : null}
                </FormControl>
              </Flex>
            </Flex>

              <Flex direction="column" gap="4">
                <Heading as="h3" size="md">
                  {categoryLabels.formatting}
                </Heading>
                {CheckboxesOfOptionKeys(
                  formDataKeys.formatting,
                  formattingOptionKeys,
                )}
              </Flex>
          </Flex>

          <Flex direction="row" justifyContent={["left", "center"]}>
            <Button type="submit" colorScheme="messenger">
              Create Components
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  )
}
