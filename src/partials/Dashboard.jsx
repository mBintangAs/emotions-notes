import { Box, Text, HStack, Button } from '@chakra-ui/react'
import { IoAddCircleOutline } from "react-icons/io5";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import Navbar from './Navbar';
export default function Dashboard() {
    const data = {
        labels: ['Happy', 'Sadness', 'Fear', 'Love', 'Anger'],
        datasets: [
            {
                label: 'Emotions',
                data: [100, 100, 100, 100, 100],
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
    };

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
        <Box fontWeight={'bold'} bg={'offWhite'} py={'45px'} px={'30px'}>
            <Text color={'purplePastel'}>Wed, 21 Aug 2024</Text>
            <Text fontSize={'32px'} color={'darkBlue'}>Welcome back!</Text>
            <Box opacity={0.7} bg={'pinkPastel'} rounded={'20px'} py={"20px"} my={'10px'} px={'30px'}>
                <Text color={'darkBlue'}>Latest Emo Statistic</Text>
                <Bar height={'300px'} data={data} options={options} />
            </Box>
            <HStack justifyContent={'space-between'}>
                <Text color={'darkBlue'} mb={'10px'} >Recent Diary</Text>
                <IoAddCircleOutline size={'20px'}></IoAddCircleOutline>
            </HStack>
            <HStack overflowX={'scroll'} overflowY={'none'} h={'130px'} mb={"45px"}>
                <Box opacity={0.7} rounded={'10px'} p={'10px'} h={'full'} minW={'120px'} bg={'mint'}>
                    <Text >Title</Text>
                    <Text fontSize={'14px'}>12:00 pm</Text>
                    <Text fontSize={'14px'}>Lorem ipsum dolor sit amet...</Text>
                </Box>
                <Box opacity={0.7} rounded={'10px'} p={'10px'} h={'full'} minW={'120px'} bg={'pinkPastel'}>
                    <Text >Title</Text>
                    <Text fontSize={'14px'}>12:00 pm</Text>
                    <Text fontSize={'14px'}>Lorem ipsum dolor sit amet...</Text>
                </Box>
                <Box opacity={0.7} rounded={'10px'} p={'10px'} h={'full'} minW={'120px'} bg={'purplePastel'}>
                    <Text >Title</Text>
                    <Text fontSize={'14px'}>12:00 pm</Text>
                    <Text fontSize={'14px'}>Lorem ipsum dolor sit amet...</Text>
                </Box>

            </HStack>
            <Navbar></Navbar>
        </Box>
    </>)
}