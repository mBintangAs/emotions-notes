import { Box, Input, Button, Text, Divider, Textarea, Spinner, Center } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CancelIcon } from './CancelIcon'
import { useFormik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { useParams } from 'react-router-dom'
export default function EditNotes() {
    const [isDisabled, setIsDisabled] = useState(false);
    const [dataStats, setDataStats] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const jwt = localStorage.getItem('jwt');
    const formik = useFormik({
        initialValues: {
            created_at: '',
            title: '',
            content: '',
        }, onSubmit: async (values) => {
            try {
                setIsDisabled(true)
                if (!values.title) {
                    alert('Title is required');
                    setIsDisabled(false)
                    return false;
                }
                if (!values.content) {
                    alert('Content is required');
                    setIsDisabled(false)
                    return false;
                }
                const { title, content } = values;
                const res = await axios.put('/journals/' + id, { title, content }, { headers: { Authorization: `Bearer ${jwt}` } });
                alert(res.data.message);
                setIsDisabled(false)

                // navigate('/dashboard');
            } catch (error) {
                setIsDisabled(false)
                console.log(error?.response);
                alert(error?.response.data.detail)
            }
        }
    });
    useEffect(() => {
        !jwt ? navigate('/') : '';
        const sync = async () => {
            const { data } = await axios.get('/journals/' + id, { headers: { Authorization: `Bearer ${jwt}` } })
            formik.setValues({
                title: data.journal.title,
                content: data.journal.content,
                created_at: data.journal.created_at,
            })
            setDataStats(
                {
                    labels: [
                        data?.emotion_analysis[0].emotion_label,
                        data?.emotion_analysis[1].emotion_label,
                        data?.emotion_analysis[2].emotion_label,
                        data?.emotion_analysis[3].emotion_label,
                        data?.emotion_analysis[4].emotion_label,
                    ],
                    datasets: [
                        {
                            label: 'Emotions',
                            data: [
                                data?.emotion_analysis[0].probability * 100,
                                data?.emotion_analysis[1].probability * 100,
                                data?.emotion_analysis[2].probability * 100,
                                data?.emotion_analysis[3].probability * 100,
                                data?.emotion_analysis[4].probability * 100,
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
            setIsLoading(false)
        }
        sync()
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
    const deleteNotes = async () => {
        try {
            if (!confirm('Apakah anda yakin untuk menghapus diary ini?')) {
                return false;
            }
            const { data } = await axios.delete('/journals/' + id, { headers: { Authorization: `Bearer ${jwt}` } })
            alert(data.message);
            navigate('/dashboard')
        } catch (error) {
            console.log(error?.response);
            alert(error?.response.data.detail)
        }
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box fontWeight={'bold'} bg={'offWhite'} py={'30px'} px={'15px'}>
                    <Box mb={'40px'} justifyContent={'center'} display={'flex'} pos={'relative'}>
                        <Button bg={'transparent'} pos={'absolute'} left={0} top={-2} as={Link} to={'/dashboard'}>
                            <CancelIcon></CancelIcon>
                        </Button>
                    </Box>
                    <Box opacity={0.7} bg={'pinkPastel'} rounded={'20px'} py={"20px"} my={'10px'} px={'30px'}>
                        <Text color={'darkBlue'}>Latest Emo Statistic</Text>
                        {isLoading ? (
                            <Center color={'darkBlue'} mb={"45px"} h={'130px'}>
                                <Spinner />
                            </Center>
                        ) : (
                            <Bar height={'300px'} data={dataStats} options={options} />
                        )}
                    </Box>
                    <Input name='title' value={formik.values.title} onChange={formik.handleChange} bg={'transparent'} placeholder='Title' fontWeight={'bold'} color={'darkBlue'} border={'none'} />

                    <Text fontWeight={'bold'} color={'purplePastel'} pl={'16px'}>{moment(formik.journal?.created_at).format('ddd, DD MMM YYYY')}</Text>
                    <Divider my={'20px'} h={'1px'} bg={'black'}></Divider>
                    <Box opacity={0.7} px={'15px'} py={'20px'} h={'590px'} rounded={'20px'} bg={'#D9D9D9'} w={'full'}>
                        <Text mb={'20px'} color={'darkBlue'} fontWeight={900} pl={'5px'}>Emotion Analyzer</Text>
                        <Textarea value={formik.values.content} name='content' onChange={formik.handleChange} bg={'#EDEDED'} borderX={'0.3px solid black'} borderTop={'0.3px solid black'} h={'450px'} roundedBottom={0} ></Textarea>
                        <Box roundedBottom={'20px'} p={'12px'} display={'flex'} justifyContent={'end'} bg={'purplePastel'} opacity={0.7} w={'full'}>
                            <Button disabled={isDisabled} type='submit' color={'darkBlue'} fontWeight={'bold'} rounded={'20px'} bg={'offWhite'} opacity={0.7}>
                                {isDisabled ?
                                    <Spinner />
                                    :
                                    "Save"
                                }
                            </Button>
                        </Box>
                    </Box>
                    <Center mt={'20px'}>
                        <Button onClick={deleteNotes}  color={'#00000'} fontWeight={'bold'} rounded={'20px'} bg={'#F05359'} opacity={0.7}>
                            Delete
                        </Button>
                    </Center>
                </Box>
            </form>
        </>
    )
}