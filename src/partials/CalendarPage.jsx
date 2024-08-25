import { Box, Button, HStack, Text, Divider, Center, Spinner } from '@chakra-ui/react'
import Navbar from './Navbar'
import Calendar from 'react-calendar';
import { useState } from 'react';
import '../calendar.css'
import moment from 'moment';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function CalendarPage() {
    const [value, setValue] = useState();
    const jwt = localStorage.getItem('jwt');
    const [date, setDate] = useState(moment().format('ddd, DD MMM YYYY'))
    const [isLoading, setIsLoading] = useState(true)
    const [notes, setNotes] = useState();
    const navigate = useNavigate();
    const sync = async (date) => {
        try {
            const { data } = await axios.get('/journals/by-date?date=' + date, { headers: { Authorization: `Bearer ${jwt}` } })
            const { data: listDate } = await axios.get('/journals/dates', { headers: { Authorization: `Bearer ${jwt}` } })
            setNotes(data)
            setValue(listDate)
            setIsLoading(false)
        } catch (error) {

        }
    }
    const changeDate = (value) => {
        setDate(moment(value).format('ddd, DD MMM YYYY'))
        sync(moment(value).format('YYYY-MM-DD'))
    }
    
    useEffect(() => {
        if (!jwt) {
            navigate('/')
        }
        sync(moment().format('YYYY-MM-DD'))
    }, [])
    return (
        <>
            <Box fontWeight={'bold'} h={'full'} bg={'offWhite'} pt={'45px'} px={'30px'}>
                <Calendar onChange={changeDate} value={value} />
                <HStack mt={'30px'} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'20px'} color={'darkBlue'}>{date}</Text>
                    <Text color={'mint'}>{notes?.length} diaries</Text>
                </HStack>
                <Box minH={'450px'} mb={'90px'} maxH={'450px'} overflow={'scroll'}>

                    {isLoading ?
                        <Center>
                            <Spinner></Spinner>
                        </Center>
                        :
                        notes?.map((value, index) => (
                            <Box key={index}>
                                <Divider bg={'#ACB0CA'} my={'20px'} h={'1px'}></Divider>
                                <HStack align={'start'} spacing={'10px'}>
                                    <Text color={'purplePastel'} opacity={0.7} fontSize={'14px'}>
                                        {moment(value.journal.created_at).format('h:mm A')}
                                    </Text>
                                    <Link to={'/journal/' + value.journal.id}>
                                        <Box w={'250px'} opacity={0.7} mb={'10px'} rounded={'10px'} p={'10px'} h={'120px'} maxH={'120px'} bg={'mint'}>
                                            <Text fontSize={'18px'} fontWeight={900}>{value.journal.title}</Text>
                                            <Text noOfLines={2} fontWeight={900} fontSize={'14px'}>{value.journal.content}</Text>
                                        </Box>
                                    </Link>
                                </HStack>
                            </Box>
                        ))}
                </Box>
                <Button as={Link} to={'/add?date='+moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss')} color={'white'} pos={'fixed'} fontSize={'28px'} bottom={'100px'} right={'15px'} bg={'darkBlue'} rounded={'10px'}>+</Button>
                <Navbar></Navbar>
            </Box>
        </>
    )
}