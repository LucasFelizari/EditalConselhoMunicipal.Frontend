import { Box, VStack, Heading, Text, Flex, Stack, Button, Spacer, HStack, Divider, SimpleGrid, Link, FormControl, FormLabel, ScaleFade, useToast } from '@chakra-ui/react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/form/Input.tsx';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQueryClient, useQuery } from "react-query";

const CreateUserFormSchema = yup.object().shape({
    nome: yup.string().required('Nome Obrigatório'),
    email: yup.string().required('E-mail Obrigatório').email('E-mail inválido'),
    endereco: yup.string().required("Endereço Obrigatório"),
    cidade: yup.string().required("campo obrigatório"),
    telefone: yup.string().required("campo obrigatório"),
    cpf: yup.string().required("CPF obrigatório"),
    senha: yup.string().required('senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    confirm_senha: yup.string().oneOf([
        null, yup.ref('senha')
    ], 'As senhas precisam ser iguais!')
})

export default function register() {
    const queryClient = useQueryClient();
    const [registros, setRegistros] = useState();
    const router = useRouter();
    const [result, setResult] = useState();
    const toast = useToast();
    const [retorno, setRetorno] = useState();

    const { isLoading, error, data, isFetching, refetch } = useQuery(
        ["registrar", registros], () => {
            return axios.post("http://localhost:3001/registrar", registros).then(res => res.data);
        }
    );

    const handleCreateUser = async (values) => {
        //await new Promise(resolve => setTimeout(resolve, 2000));
        setRegistros(values);

        queryClient.refetchQueries(["registrar", registros], {
            stale: true,
        });
    }

    useEffect(() => {
        if (!data) return;
        setRetorno(data)
    }, [data]);

    useEffect(() => {
        console.log(retorno);
        if (retorno == 'success') {
            router.push("/");

            toast({
                title: 'Conta criada!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else  if(retorno === 'erro'){
            toast({
                title: 'Não foi possível concluir o cadastro',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }, [retorno]);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(CreateUserFormSchema)
    })
    const { errors } = formState;

    return (
        <ScaleFade initialScale={0.9} in={true}>
            <Box mt="-13rem" mx="auto" w="70vw" minH="85vh" bg="gray.100" borderRadius="1rem" p="1rem"
            >
                <HStack onClick={() => router.push("/")} cursor="pointer" p="1rem">
                    <AiOutlineArrowLeft />
                    <Heading fontSize="1.2rem"> Voltar</Heading>
                </HStack>
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.100"
                    p={["6", "8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="md" fontWeight="normal">Criar Usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8" h="100%">

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                            <Input
                                name="nome"
                                label="Nome completo"
                                bg="gray.200"
                                type="text"
                                {...register("nome")}
                                error={errors.nome}
                            />

                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                bg="gray.200"

                                {...register("email")}
                                error={errors.email}
                            />

                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                            <Input
                                name="endereco"
                                label="Endereço"
                                bg="gray.200"
                                {...register("endereco")}
                                error={errors.endereco}
                                type="text"
                            />

                            <Input
                                name="cidade"
                                label="Cidade"
                                bg="gray.200"
                                {...register("cidade")}
                                error={errors.cidade}
                                type="text"
                            />

                            <Input
                                name="telefone"
                                label="Telefone"
                                bg="gray.200"
                                {...register("telefone")}
                                error={errors.telefone}
                                type="number"
                            />

                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

                            <Input
                                name="cpf"
                                label="CPF"
                                bg="gray.200"
                                {...register("cpf")}
                                error={errors.cpf}
                                type="number"
                            />

                            <Input
                                name="senha"
                                type="password"
                                label="Senha"
                                bg="gray.200"
                                {...register("senha")}
                                error={errors.senha}

                            />

                            <Input
                                name="confirm_senha"
                                type="password"
                                label="Confirmar Senha"
                                bg="gray.200"
                                {...register("confirm_senha")}
                                error={errors.confirm_senha}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Spacer />
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link passHref>
                                <Button bg="gray.400" onClick={() => router.push("/")}>Cancelar</Button>
                            </Link>
                            <Button
                                type="submit"
                                colorScheme="green"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>

                    </Flex>
                </Box>
            </Box>
        </ScaleFade>
    );
}