import { Box, Input, Button, Text, Divider, Textarea } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { CancelIcon } from './CancelIcon'
export default function AddNotes() {
    return (
        <>
            <Box fontWeight={'bold'} bg={'offWhite'} py={'30px'} px={'15px'}>
                <Box justifyContent={'center'} display={'flex'} pos={'relative'}>
                    <Button bg={'transparent'} pos={'absolute'} left={0} top={-2} as={Link} to={'/dashboard'}>
                        <CancelIcon></CancelIcon>
                    </Button>
                    <Text color={'darkBlue'}>Write Diary</Text>
                </Box>

                <Input mt={'40px'} bg={'transparent'} placeholder='Title' fontWeight={'bold'} color={'darkBlue'} border={'none'} />

                <Text fontWeight={'bold'} color={'purplePastel'} pl={'16px'}>Wed, 21 Aug 2024</Text>
                <Divider my={'20px'} h={'1px'} bg={'black'}></Divider>
                <Box opacity={0.7} px={'15px'} py={'20px'} h={'590px'} rounded={'20px'} bg={'#D9D9D9'} w={'full'}>
                    <Text mb={'20px'} color={'darkBlue'} fontWeight={900} pl={'5px'}>Emotion Analyzer</Text>
                    <Textarea bg={'#EDEDED'} borderX={'1px solid black'} borderTop={'1px solid black'} h={'450px'} roundedBottom={0} >Enter Your Text</Textarea>
                </Box>
            </Box>
        </>
    )
}