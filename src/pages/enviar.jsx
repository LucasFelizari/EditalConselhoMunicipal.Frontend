import { Box, VStack, Heading, Text, Flex, Stack, Button, Image, FormControl, FormLabel, Textarea, HStack, ScaleFade, useToast } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import UploadFile from '../components/UploadFile/index.tsx'
import { UserContext } from '../context/userContext'
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient, useQuery } from "react-query";
import { Input } from '../components/form/Input.tsx';

const SendEditalFormSchema = yup.object().shape({
    titulo: yup.string().required('Informe um título'),
    descricao: yup.string().required('Informe a descrição')
})

export default function enviar() {
    const [edital, setEdital] = useState();
    const { user } = useContext(UserContext);
    const router = useRouter();
    const [file, setFile] = useState();
    const [resposta, setResposta] = useState();
    console.log(user)
    const queryClient = useQueryClient();
    const toast = useToast()

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["enviaredital", edital], () => {
            return axios.post("http://localhost:3001/enviaredital", edital).then(res => res.data);
        }
    );

    const handleSendEdital = async (values) => {
        console.log(values);
        setEdital({
            idusuario: user.idusuario,
            titulo: values.titulo,
            descricao: values.descricao,
            data_envio: new Date()
        })

        queryClient.refetchQueries(["enviaredital", edital], {
            stale: true,
        });
    }

    useEffect(() => {
        if (!data) return;
        setResposta(data)
    }, [data]);

    useEffect(() => {
        if (resposta == "success") {
            toast({
                title: "projeto enviado com sucesso!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            router.push("/useredital");
        }
    }, [resposta]);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(SendEditalFormSchema)
    })

    const { errors } = formState;

    console.log(resposta)

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Flex w="90vw" minH="80vh" bg="gray.100" mx="auto" mt="-10rem" borderRadius="1.5rem">
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleSendEdital)}
                >
                    <Box>
                        <Heading size="md">Envio de Projetos</Heading>
                        <Text >Preencha as informações solicitadas e faça um breve resumo do seu projeto, que em breve será analizado</Text>
                        <HStack w="100%">
                            <VStack align="start" w="60vw">

                                <Input
                                    name="Escreva uma breve descrição sobre o projeto"
                                    label="Título"
                                    bg="gray.300"
                                    {...register("titulo")}
                                    error={errors.titulo}
                                />
                                <Input
                                    name=""
                                    label="Escreva uma breve descrição sobre o projeto"
                                    {...register("descricao")}
                                    error={errors.descricao}
                                    minH="200px"
                                    bg="gray.300"
                                />
                            </VStack>
                            <VStack mt="2rem" w="100%" spacing="3rem" p="2rem" >
                                <HStack h="150px" w="100%" align="start" p="1rem">
                                    {file?.map((item, key) => (
                                        <VStack key={key}>
                                            <Image src="/pdf.png" boxSize="80px" />
                                            <Text>{item.name}</Text>
                                        </VStack>
                                    ))}
                                </HStack>
                                <Box w="100%" h="150px" border="1px" borderColor="gray.600" borderRadius="5px" >
                                    <UploadFile file={file} setFile={setFile} />
                                </Box>
                                <Box w="100%" align="end">
                                </Box>
                            </VStack>
                        </HStack>
                    </Box>
                    <Button w="130px" color="white" type="submit" bg="green.500">Enviar</Button>
                </Box>
            </Flex>
        </ScaleFade>
    );
}