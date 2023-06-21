import { Grid, GridItem, Text, useBreakpointValue } from '@chakra-ui/react'
import { NavBar } from "../components/NavBar"
import PostCard from '../components/PostCard';


const Home=()=>{
    // const gridItemOrder = useBreakpointValue({ base: 2, md: 1 });

    return(
        <>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        <PostCard/>
        </>
    )
}

export default Home;