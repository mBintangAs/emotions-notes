import {
    Box, Text, Center, FormControl,
    FormLabel,
    Button, Spinner, Drawer,
    Input, useDisclosure, FormErrorMessage
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isDisabled, setIsdisabled] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            onOpen()
        }, 500);
    }, [])
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = 'Password is required';
            }
            if (!values.username) {
                errors.username = 'Username is required';
            }
            return errors;
        }, onSubmit: async (values) => {
            try {
                setIsdisabled(true)
                const { username, password } = values;
                const res = await axios.post('/login', { username, password });
                console.log(res.data)
                localStorage.setItem('jwt', res.data.access_token)
                navigate('/dashboard')
                // console.log("status "+res.status);
            } catch (error) {
                setIsdisabled(false)
                alert(error?.response.data.detail)
            }
        }
    })
    return (
        <Box h={'100vh'} backgroundRepeat={'no-repeat'} backgroundSize={'cover'} backgroundImage={{ base: '/src/assets/background.png', lg: 'none' }} w={{ md: 'full' }} backgroundColor={'mint'}>
            <Drawer placement={'bottom'} isOpen={isOpen}>
                <Box h={'600px'} px={7} py={10} w={'full'} bottom={0} left={0} bgColor={'offWhite'} pos={'absolute'} rounded={'30px'}>
                    <Center >
                        <Text variant='h1' fontWeight={'bold'} fontSize={'20px'}  >Welcome Back</Text>
                    </Center>
                    <FormControl isInvalid={formik.errors.username} mt={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Username</FormLabel>
                        <Input name='username' value={formik.values.username} onChange={formik.handleChange} border={'1px black solid'} type='text' />
                        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password} my={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Password</FormLabel>
                        <Input name='password' value={formik.values.password} onChange={formik.handleChange} border={'1px black solid'} type='password' />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button onClick={formik.submitForm} disabled={isDisabled} bgColor={'purplePastel'} color={'offWhite'} w={'full'}>
                        {isDisabled ?
                            <Spinner />
                            :
                            "Sign In"
                        }
                    </Button>
                    <Center mt={10}>
                        <Text color={'purplePastel'}>Dont have an account?
                            <Text as={Link} to={'/signup'} fontWeight={'bold'} color={'darkBlue'}> Sign Up</Text>
                        </Text>
                    </Center>
                </Box>
            </Drawer>

        </Box>
    )
}