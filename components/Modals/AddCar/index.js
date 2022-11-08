import BasicUsage from '../../BasicUsage'
import {
    ModalHeader,
    ModalContent,
    ModalCloseButton,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Input,
    ModalBody,
    Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const AddCar = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    return (
        <BasicUsage
            isOpen={isOpen}
            onClose={() => {
                onClose()
                reset()
            }}>
            <ModalContent>
                <ModalHeader>Create a Car</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody pb={6}>
                        <FormControl mt={4} isInvalid={errors?.title}>
                            <FormLabel>Title</FormLabel>
                            <Input placeholder='Title' {...register("title", { required: { value: true, message: "Title is missing" } })} />
                            <FormErrorMessage>{errors?.title && errors?.title?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors?.model}>
                            <FormLabel>Model</FormLabel>
                            <Input placeholder='Model' {...register("model", { required: { value: true, message: "Model is missing" } })} />
                            <FormErrorMessage>{errors?.model && errors?.model?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors?.gear}>
                            <FormLabel>Gear</FormLabel>
                            <Input placeholder='Gear' {...register("gear", { required: { value: true, message: "Gear is missing" } })} />
                            <FormErrorMessage>{errors?.gear && errors?.gear?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors?.year}>
                            <FormLabel>Year</FormLabel>
                            <Input placeholder='Year' {...register("year", { required: { value: true, message: "Year is missing" } })} />
                            <FormErrorMessage>{errors?.year && errors?.year?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors?.image}>
                            <FormLabel>Image</FormLabel>
                            <Input placeholder='Image' type={'file'} {...register("image", { required: { value: true, message: "Image is missing" } })} />
                            <FormErrorMessage>{errors?.image && errors?.image?.message}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors?.image}>
                            <Button type='submit'>Submit</Button>
                        </FormControl>
                    </ModalBody>
                </form>
            </ModalContent>
        </BasicUsage>
    );
};

export default AddCar;
