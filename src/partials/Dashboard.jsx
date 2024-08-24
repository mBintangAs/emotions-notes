import { Box, Text, HStack, Button, Spinner, Center } from '@chakra-ui/react'
import { IoAddCircleOutline } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';
// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import Navbar from './Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {

    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const colors = ['mint', 'pinkPastel', 'purplePastel'];
    const navigate = useNavigate()
    const [notes, setNotes] = useState([])
    const [dataStats, setDataStats] = useState()
    useEffect(() => {
        try {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                navigate('/')
            }
            const fetch = async () => {
                const { data } = await axios.get('journals/latest', { headers: { Authorization: `Bearer ${jwt}` } });
                let tempNotes = Array.isArray(data) ? data : [data];  // Menyesuaikan jika data bukan array
                setNotes(tempNotes);
                console.log(notes);
                console.log(tempNotes[0]);
                if (tempNotes.length > 0 && tempNotes[0].journals.length>1) {
                    setDataStats(
                        {
                            labels: [
                                tempNotes[0]?.emotion_analysis[0].emotion_label,
                                tempNotes[0]?.emotion_analysis[1].emotion_label,
                                tempNotes[0]?.emotion_analysis[2].emotion_label,
                                tempNotes[0]?.emotion_analysis[3].emotion_label,
                                tempNotes[0]?.emotion_analysis[4].emotion_label,
                            ],
                            datasets: [
                                {
                                    label: 'Emotions',
                                    data: [
                                        tempNotes[0]?.emotion_analysis[0].probability * 100,
                                        tempNotes[0]?.emotion_analysis[1].probability * 100,
                                        tempNotes[0]?.emotion_analysis[2].probability * 100,
                                        tempNotes[0]?.emotion_analysis[3].probability * 100,
                                        tempNotes[0]?.emotion_analysis[4].probability * 100,
                                    ],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        })
                }
                setIsLoadingNotes(false)
            }
            fetch()
        } catch (error) {
            // console.log(error);
        }
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Emotions Distribution',
            },
        },
    };
    return (<>
        <Box fontWeight={'bold'} h={'100vh'} bg={'offWhite'} pt={'45px'} px={'30px'}>
            <Text color={'purplePastel'}>{moment().format('ddd, DD MMM YYYY')}</Text>
            <Text fontSize={'32px'} color={'darkBlue'}>Welcome back!</Text>
            <Box opacity={0.7} bg={'pinkPastel'} rounded={'20px'} py={"20px"} my={'10px'} px={'30px'}>
                <Text color={'darkBlue'}>Latest Emo Statistic</Text>
                {isLoadingNotes ? (
                    <Center color={'darkBlue'} mb={"45px"} h={'130px'}>
                        <Spinner />
                    </Center>
                ) : !dataStats ? (
                    <Center color={'darkBlue'} mb={"45px"} h={'130px'}>
                        Empty
                    </Center>
                ) : (
                    <Bar height={'300px'} data={dataStats} options={options} />
                )}
            </Box>
            <HStack justifyContent={'space-between'}>
                <Text color={'darkBlue'} mb={'10px'} >Recent Diary</Text>
                <Link to={'/add'}>
                    <IoAddCircleOutline size={'20px'}></IoAddCircleOutline>
                </Link>
            </HStack>
            {isLoadingNotes ? (
                <Center color={'darkBlue'} mb={"45px"} h={'130px'}>
                    <Spinner />
                </Center>
            ) : notes[0].journals.length < 1 ? (
                <Center color={'darkBlue'} mb={"45px"} h={'130px'}>
                    Empty
                </Center>
            ) : (
                <HStack overflowX={'scroll'} overflowY={'none'} h={'130px'} mb={"90px"}>
                    {notes.map((value, index) => (
                        <Box key={index} opacity={0.7} rounded={'10px'} p={'10px'} h={'full'} minW={'120px'} maxW={'120px'} bg={colors[index % colors.length]}>
                            <Text fontSize={'18px'} fontWeight={900}>{value.journals.title}</Text>
                            <Text fontSize={'14px'}>{moment(value.journals.created_at).format("h:mm A")}</Text>
                            <Text noOfLines={3} fontSize={'14px'}>{value.journals.content}</Text>
                        </Box>
                    ))}
                </HStack>
            )}

            <Navbar></Navbar>
        </Box>
    </>)
}