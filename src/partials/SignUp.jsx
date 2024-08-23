import {
    Box, Text, Center, FormControl,
    FormLabel,
    Button, FormErrorMessage, Drawer,
    Input, useDisclosure, Spinner
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();
    const [isDisabled, setIsdisabled] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            onOpen()
        }, 500);
    }, [])
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = 'Password is required';
            }
            if (!values.username) {
                errors.username = 'Username is required';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm Password is required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            return errors;
        },
        onSubmit: async (values) => {
            setIsdisabled(true)
            const {username,password} = values;
            const res = await axios.post('/signup',{username,password});
            alert(res.data.message);
            navigate('/signin');
            // setIsdisabled(false)
        }
    });

    return (
        <Box h={'100vh'} backgroundRepeat={'no-repeat'} backgroundSize={{ base: 'cover', lg: '' }} backgroundImage={{ base: '/src/assets/background.png', lg: 'none' }} w={{ md: 'full' }} backgroundColor={'mint'}>
            <Drawer placement={'bottom'} isOpen={isOpen}>
                <Box h={'600px'} px={7} py={10} w={'full'} bottom={0} left={0} bgColor={'offWhite'} pos={'absolute'} rounded={'30px'}>
                    <Center >
                        <Text variant='h1' fontWeight={'bold'} fontSize={'20px'}  >Get Started</Text>
                    </Center>
                    <FormControl isInvalid={formik.errors.username} mt={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Username</FormLabel>
                        <Input name='username' value={formik.values.username} onChange={formik.handleChange} border={'1px black solid'} type='text' />
                        <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password} mt={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Password</FormLabel>
                        <Input name='password' value={formik.values.password} onChange={formik.handleChange} border={'1px black solid'} type='password' />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.confirmPassword} my={5} >
                        <FormLabel fontWeight={'800'} fontFamily={'Quicksand'}>Confirm Password</FormLabel>
                        <Input name='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange} border={'1px black solid'} type='password' />
                        <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <Button disabled={isDisabled} onClick={formik.submitForm} bgColor={'purplePastel'} color={'offWhite'} w={'full'}>
                        {isDisabled ?
                            <Spinner />
                            :
                            "Sign Up"
                    }
                    </Button>

                    <Center mt={10}>
                        <Text color={'purplePastel'}>Dont have an account?
                            <Text as={Link} to={'/signin'} fontWeight={'bold'} color={'darkBlue'}> Sign Up</Text>
                        </Text>
                    </Center>
                </Box>
            </Drawer>

        </Box>
        
    )
}