import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react'
import { NavBar } from "../components/NavBar"


const Home=()=>{
    // const gridItemOrder = useBreakpointValue({ base: 2, md: 1 });

    return(

        // <div className="home-page">
            <Grid templateColumns='1fr 3fr 1fr'>
                        <GridItem> <NavBar/> </GridItem>

                {/* <GridItem bg='purple.400'>  </GridItem>
                <GridItem >  </GridItem> */}
            </Grid>
        // </div>
    )
}

export default Home;