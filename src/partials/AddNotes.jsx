import { Box, Input, Button, Text, Divider, Textarea, Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CancelIcon } from './CancelIcon'
import { useFormik } from 'formik'
import moment from 'moment'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
export default function AddNotes() {
    const [isDisabled, setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const jwt = localStorage.getItem('jwt');
    useEffect(() => !jwt ? navigate('/') : '', [])

    const formik = useFormik({
        initialValues: {
            created_at: moment().format('YYYY-MM-DDTHH:mm:ss'),
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
                const { title, content, created_at } = values;
                const res = await axios.post('/journals', { title, content, created_at }, { headers: { Authorization: `Bearer ${jwt}` } });
                alert(res.data.message);
                navigate('/dashboard');
            } catch (error) {
                setIsDisabled(false)
                console.log(error?.response);
                alert(error?.response.data.detail)
            }
        }
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box fontWeight={'bold'} bg={'offWhite'} py={'30px'} px={'15px'}>
                    <Box justifyContent={'center'} display={'flex'} pos={'relative'}>
                        <Button bg={'transparent'} pos={'absolute'} left={0} top={-2} as={Link} to={'/dashboard'}>
                            <CancelIcon></CancelIcon>
                        </Button>
                        <Text color={'darkBlue'}>Write Diary</Text>
                    </Box>

                    <Input name='title' value={formik.values.title} onChange={formik.handleChange} mt={'40px'} bg={'transparent'} placeholder='Title' fontWeight={'bold'} color={'darkBlue'} border={'none'} />

                    <Text fontWeight={'bold'} color={'purplePastel'} pl={'16px'}>{moment().format('ddd, DD MMM YYYY')}</Text>
                    <Divider my={'20px'} h={'1px'} bg={'black'}></Divider>
                    <Box opacity={0.7} px={'15px'} py={'20px'} h={'590px'} rounded={'20px'} bg={'#D9D9D9'} w={'full'}>
                        <Text mb={'20px'} color={'darkBlue'} fontWeight={900} pl={'5px'}>Emotion Analyzer</Text>
                        <Textarea value={formik.values.content} name='content' onChange={formik.handleChange} bg={'#EDEDED'} borderX={'0.3px solid black'} borderTop={'0.3px solid black'} h={'450px'} roundedBottom={0} >Enter Your Text</Textarea>
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
                </Box>
            </form>
        </>
    )
}