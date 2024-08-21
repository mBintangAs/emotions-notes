import {
    Box, Text, Center, FormControl,
    FormLabel,
    Button, Image, Drawer,
    Input, useDisclosure
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
export default function SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(() => {
        setTimeout(() => {
            onOpen() 
        }, 500);
    }, [])
    return (
        <Box  h={'100vh'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} backgroundImage={'/src/assets/background.png'} w={{ md: 'full' }} backgroundColor={'mint'}>
            <Drawer placement={'bottom'} isOpen={isOpen}>
                <Box  h={'600px'} px={7} py={10} w={'full'} bottom={0} left={0} bgColor={'offWhite'} pos={'absolute'} rounded={'30px'}>
                    <Center >
                        <Text variant='h1' fontWeight={'bold'} fontSize={'20px'}  >Welcome Back</Text>
                    </Center>
                    <FormControl mt={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Email</FormLabel>
                        <Input border={'1px black solid'} type='email' />
                        {/* {!isError ? (
                        <FormHelperText>
                            Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                    </FormControl>
                    <FormControl my={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Password</FormLabel>
                        <Input border={'1px black solid'} type='password' />
                        {/* {!isError ? (
                        <FormHelperText>
                            Enter the email you'd like to receive the newsletter on.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                    )} */}
                    </FormControl>
                   
                    <Button bgColor={'purplePastel'} color={'offWhite'} w={'full'}>Sign In</Button>
                    <Center mt={10} color={'purplePastel'} px='4'>
                        Sign In With
                    </Center>
                    <Center my={5} color={'purplePastel'} px='4'>
                        <Image src={'/src/assets/google.png'} alt='' />
                    </Center>
                    <Center>
                        <Text color={'purplePastel'}>Dont have an account?
                            <Text as={Link} to={'/signup'} fontWeight={'bold'} color={'darkBlue'}> Sign Up</Text>
                        </Text>
                    </Center>
                </Box>
            </Drawer>

        </Box>
    )
}