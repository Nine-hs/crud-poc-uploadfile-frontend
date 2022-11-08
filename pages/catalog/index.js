import Layout from "../../components/Layout";
import AddCar from "../../components/Modals/AddCar";
import UpdateCar from "../../components/Modals/UpdateCar";
import {
  useDisclosure,
  Box,
  TableContainer,
  useToast,
  Table,
  Thead,
  Tbody,
  Stack,
  Tr,
  Td,
  Th,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const ThreeTierPricingHorizontal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cars, setCars] = useState([]);
  const [car, setCar] = useState({ isEdit: false, data: null });
  const toast = useToast();

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/cars`);
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

  const onSubmit = useCallback(async (data) => {
    let image = data?.image?.[0];
    var formData = new FormData();
    formData.append("upload", image);
    const uploadFile = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/cars/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (![200, 201].includes(uploadFile?.status)) {
      toast({
        description: "Something went wrong",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    const imageWithPath = `${process.env.NEXT_PUBLIC_API}/cars/image/${uploadFile.data?.keyImage}`;
    data = { ...data, image: imageWithPath };
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/cars`, data);
    if (![200, 201].includes(res?.status)) {
      toast({
        description: "Something went wrong",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    toast({
      description: "Successfully",
      colorScheme: "green",
      position: "top-right",
    });
    onClose();
    getCars();
  }, []);

  const removeCar = useCallback(async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API}/cars/${id}`);
    if (![200, 201].includes(res?.status)) {
      toast({
        description: "Something went wrong",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    toast({
      description: "Successfully",
      colorScheme: "green",
      position: "top-right",
    });

    getCars();
  }, []);

  const editCar = useCallback(async (id) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/cars/${id}`);
    if (![200, 201].includes(res?.status)) {
      toast({
        description: "Something went wrong",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    setCar({ isEdit: true, data: res?.data });
  }, []);

  const submitEdit = useCallback(async (data) => {
    if (typeof data?.image === 'object') {
      const image = data?.image?.[0];
      var formData = new FormData();
      formData.append("upload", image);
      const uploadFile = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/cars/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (![200, 201].includes(uploadFile?.status)) {
        toast({
          description: "Something went wrong",
          colorScheme: "red",
          position: "top-right",
        });
        return;
      }

      const imageWithPath = `${process.env.NEXT_PUBLIC_API}/cars/image/${uploadFile.data?.keyImage}`;
      data = { ...data, image: imageWithPath };
    } else {
      delete data?.image;
    }

    const { id, ...carData } = data;
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/cars/${id}`,
      data
    );
    if (![200, 201].includes(res?.status)) {
      toast({
        description: "Something went wrong",
        colorScheme: "red",
        position: "top-right",
      });
      return;
    }

    toast({
      description: "Successfully",
      colorScheme: "green",
      position: "top-right",
    });
    setCar({ isEdit: false, data: null });
    getCars();
  }, []);

  return (
    <Layout>
      <AddCar isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
      <UpdateCar
        isOpen={car.isEdit}
        onClose={() => setCar({ isEdit: false, data: null })}
        data={car.isEdit && car.data}
        onSubmit={submitEdit}
      />
      <Box py={6} px={5} min={"100vh"}>
        <Stack>
          <Stack direction="row" spacing={4} align="center" mb={10}>
            <Button
              colorScheme="teal"
              size={"sm"}
              variant="outline"
              onClick={onOpen}
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <TableContainer>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Model</Th>
                <Th>Gear</Th>
                <Th>Year</Th>
                <Th>Image</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cars?.length > 0 &&
                cars?.map((car) => {
                  return (
                    <Tr key={car?.id}>
                      <Td>{car?.title}</Td>
                      <Td>{car?.model}</Td>
                      <Td>{car?.gear}</Td>
                      <Td> {car?.year}</Td>
                      <Td>
                        {car?.image && (
                          <img
                            src={car?.image}
                            height={300}
                            width={200}
                            style={{ maxWidth: "100%" }}
                          />
                        )}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          size={"sm"}
                          variant="outline"
                          onClick={() => editCar(car?.id)}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="teal"
                          size={"sm"}
                          variant="outline"
                          onClick={() => removeCar(car?.id)}
                        >
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default ThreeTierPricingHorizontal;
