import { Flex, Spinner } from "@chakra-ui/react"



const TwirloSpinner=()=>{
    return(
        <Flex
      align="center"
      justify="center"
      minHeight="100dvh"
    >
      <Spinner
        type="twitter"
        thickness="4px"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
    )
}
export default TwirloSpinner;