import { Box, Button, Heading, HStack, ScaleFade, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "react-query";
import { GiHamburgerMenu } from 'react-icons/gi';
import UserModal from '../components/UserModal';

export default function admin() {
    const queryClient = useQueryClient();
    const [editais, setEditais] = useState();

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["buscarenvios"], () => {
            return axios.post("http://localhost:3001/buscarenvios").then(res => res.data);
        }
    );

    useEffect(() => {
        queryClient.refetchQueries(["buscarenvios"], {
            stale: true,
        });
    }, []);

    useEffect(() => {
        if (!data) return;
        setEditais(data)
    }, [data]);

    console.log(editais);


    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box mt="-10rem" mx="auto" w="90vw" minH="75vh" bg="gray.100" borderRadius="1rem">
                <VStack overflowY="auto"  align="start" p="1.5rem" spacing="2rem">
                    <Heading fontSize="1.3rem">Editais recebidos</Heading>
                  
                        {!!editais &&
                            editais.map((edital, key) => (
                                <HStack
                                    key={key}
                                    w="100%"
                                    border="1px"
                                    borderRadius="4px"
                                    spacing="0.7rem"
                                    p="1.5rem"
                                    align="start"
                                >
                                    <VStack align="start">
                                        <Heading fontSize="1.3rem">{edital.titulo}</Heading>
                                        <Heading whiteSpace="nowrap" fontWeight="semibold" fontSize="1rem">Autor: {edital.nome}</Heading>
                                    </VStack>
                                    <HStack justify="space-between" w="100%" ml="2rem">
                                        <VStack ml="2rem">
                                            <Text>{edital.descricao}</Text>
                                        </VStack>
                                        <VStack>
                                            <UserModal usuario={edital} />
                                        </VStack>
                                    </HStack>
                                </HStack>
                            ))}
                   
                </VStack>
            </Box>
        </ScaleFade>
    );
}