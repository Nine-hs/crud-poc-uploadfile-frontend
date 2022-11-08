import Layout from '../components/Layout'
import {
  Box,
  Divider,
  Heading,
  useToast,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from "axios";


const PackageTier = ({
  total = 0,
  model = '',
  gear = '',
  checked = false,
}) => {


  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}>
      <Heading size={'md'}>{model}</Heading>
      <List spacing={3} textAlign="start">
        <ListItem >
          <ListIcon as={FaCheckCircle} color="green.500" />
          {gear}
        </ListItem>
      </List>
      <Heading size={'xl'}>{total}</Heading>
    </Stack>
  );
};


const ThreeTierPricingHorizontal = () => {
  const [cars, setCars] = useState([]);
  const toast = useToast();

  const getCars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/cars/report`);
    if (![200, 201].includes(res?.status)) {
      toast({
        description: "Something went wrong to Fetch data",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    setCars(res.data);
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <Layout>
      <Box py={6} px={5} min={'100vh'}>
        <Stack spacing={4} width={'100%'} direction={'column'}>
          <Stack
            p={5}
            alignItems={'center'}
            justifyContent={{
              base: 'flex-start',
              md: 'space-around',
            }}
            direction={{
              base: 'column',
              md: 'row',
            }}>
            <Text fontSize='50px' color='green.500'>
             Report Monitor
            </Text>
          </Stack>

          {
            cars?.length > 0 && cars?.map(car => {
              return (
                <>
                  <Divider />
                  <PackageTier gear={car?.gear} model={car?.model} total={car?.total} />
                </>
              )

            })
          }
        </Stack>
      </Box>
    </Layout>
  );
};

export default ThreeTierPricingHorizontal;