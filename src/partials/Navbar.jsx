import { HStack, Button } from '@chakra-ui/react'
import { HomeIcon } from './HomeIcon'
import { AddIcon } from './AddIcon'
import { CalendarIcon } from './CalendarIcon'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function Navbar() {
    const location = useLocation();
    return (
        <>
            <HStack justifyContent={'space-around'} h={'90px'} pos={'fixed'} bottom={0} left={0} bg={'offWhite'} w={'full'} >
                <Button as={Link} w={'full'} h={'full'} bg={'transparent'} to={'/dashboard'}>
                    <HomeIcon fill={location.pathname == '/dashboard' ? '#1E2A5E' : "#ACB0CA"}  ></HomeIcon>
                </Button>
                <Button as={Link} w={'full'} h={'full'} bg={'transparent'} to={'/add'}>
                    <AddIcon ></AddIcon>
                </Button>
                <Button as={Link} w={'full'} h={'full'} bg={'transparent'} to={'/calendar'}>
                    <CalendarIcon fill={location.pathname == '/calendar' ? '#1E2A5E' : "#ACB0CA"}></CalendarIcon>
                </Button>
            </HStack>
        </>
    )
}