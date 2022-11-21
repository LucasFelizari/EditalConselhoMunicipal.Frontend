import { Box, Button, Flex, Heading, ScaleFade, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { UserContext } from "../context/userContext";
import ListarEditaisUsuario from "../components/ListarEditaisUsuario";

export default function useredital() {
    const router = useRouter();
    const { user } = useContext(UserContext);
    const [idusuario, setIdUsuario] = useState();
    const queryClient = useQueryClient();

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["buscareditaisusuario", idusuario], () => {
            return axios.post("http://localhost:3001/buscareditaisusuario", idusuario)
                .then(res => res.data);
        }
    );

    useEffect(() => {
        if (!!user) {
            setIdUsuario({
                idusuario: user.idusuario
            })
        }
    }, [user]);

    useEffect(() => {
        console.log(idusuario);
        if (!!idusuario || idusuario != undefined) {
            queryClient.refetchQueries(["buscareditaisusuario", idusuario], {
                stale: true,
            });
        }
    }, [idusuario]);

    console.log(data);

    if (!!user) {
        return (
            <ScaleFade initialScale={0.9} in={true}>
                <Box mt="-10rem" mx="auto" p="1rem" w="93vw" minH="75vh" bg="gray.100" borderRadius="1rem" >
                    <VStack align="start"  p="1.5rem" spacing="2rem">
                        <Heading fontSize="1.5rem">Olá, {user?.nome}</Heading>

                        {data == undefined || data.length > 0 ?
                            <ListarEditaisUsuario editais={data} />
                            :
                            <Box maxW="350px" m="1rem">
                                <Text>Você ainda não enviou nenhum projeto, clique no botão abaixo para realizar o envio</Text>
                            </Box>
                        }
                        <Stack mt="auto">
                            <Button bg="green.500" w="150px" onClick={() => router.push("/enviar")}>Enviar Novo</Button>
                        </Stack>
                    </VStack>
                </Box>
            </ScaleFade>
        );
    }
    else return <Spinner size='xl' />
}