import { Box, HStack, Text, Divider } from '@chakra-ui/react'
import Navbar from './Navbar'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../calendar.css'
import moment from 'moment';
export default function CalendarPage() {
    const [value, onChange] = useState([new Date(),new Date("2024-08-01")]);
    return (
        <>
            <Box fontWeight={'bold'} h={'100vh'} bg={'offWhite'} pt={'45px'} px={'30px'}>
                <Calendar onChange={onChange} value={value} />
                <HStack mt={'30px'} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'darkBlue'}>{moment().format("ddd, DD MMM YYYY")}</Text>
                    <Text color={'mint'}>3 diaries</Text>
                </HStack>
                <Divider bg={'#ACB0CA'} my={'20px'} h={'1px'}></Divider>
                <Box opacity={0.7} rounded={'10px'} p={'10px'} h={'full'} maxH={'120px'} bg={'mint'}>
                    <Text fontSize={'18px'} fontWeight={900}>Title</Text>
                    <Text noOfLines={2} fontWeight={900} fontSize={'14px'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </Box>
                <Navbar></Navbar>
            </Box>
        </>
    )
}