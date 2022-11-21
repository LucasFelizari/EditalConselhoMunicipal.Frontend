import { Box, VStack, Heading, Text, Flex, Stack, Button, Image, ScaleFade, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../components/form/Input.tsx';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useQueryClient, useQuery } from "react-query";
import { UserContext } from '../context/userContext';

const CreateLoginFormSchema = yup.object().shape({
  email: yup.string().required('Informe o E-mail').email('E-mail inválido'),
  senha: yup.string().required('Insira a senha')
})

export default function Home() {
  const toast = useToast()
  const { user, dispatchUser } = useContext(UserContext);
  const [registro, setRegistro] = useState();
  const [resposta, setResposta] = useState();

  const queryClient = useQueryClient();
  const router = useRouter();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    ["login", registro], () => {
      return axios.post("http://localhost:3001/login", registro).then(res => res.data);
    }
  );

  const handleLoginUser = async (values) => {
    setRegistro(values)
    //await new Promise(resolve => setTimeout(resolve, 2000));
    queryClient.refetchQueries(["login", registro], {
      stale: true,
    });

  }

  useEffect(() => {
    if (!data) return;
    setResposta(data)
  }, [data]);


  useEffect(() => {
    console.log(resposta);
    
    if (resposta?.msg === "success" && !!resposta.user) {
      let string = "Bem vindo " + resposta.user.nome + "!";
      toast({
        title: string,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      dispatchUser(resposta.user);
      router.push("/useredital");
    }
    else if (resposta?.msg === "senhaErrada" || resposta?.msg === "naoEncontrado"){
      toast({
        title: 'Erro ao efetuar login',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [resposta]);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateLoginFormSchema)
  })

  const { errors } = formState;

  return (
    <ScaleFade initialScale={0.9} in={true}>
      <Box mt="-10rem" mx="auto" w="70vw" h="75vh" bg="gray.100" borderRadius="1rem"
        bgImage="/brusqueFundo.jpg"
        backgroundSize="100%"
        bgRepeat="no-repeat"
        bgPosition="right"
      >
        <VStack w="400px" h="100%" pt="2rem" spacing="2rem" bg="gray.200" borderRadius="1rem 0 0 1rem"
        >
          <Box maxW="250px" >
            <Heading fontSize="1.5rem">Conselho Municipal de Cultura</Heading>
          </Box>
          <Text>Faça o login para enviar seu projeto</Text>

          <Flex
            as="form"
            w="100%"
            maxW={360}
            onSubmit={handleSubmit(handleLoginUser)}
            flexDir="column"
          >
            <Stack spacing="4">

              <Input
                name="email"
                type="email"
                label="E-mail"
                bg="gray.300"
                {...register("email")}
                error={errors.email}
              />

              <Input
                name="senha"
                type="password"
                label="Senha"
                bg="gray.300"
                {...register("senha")}
                error={errors.senha}
              />

              <Button type="submit"  color="white" bg="green.600" size="lg" >Entrar</Button>
              <Text>Não possui uma conta? <Button as="span" cursor="pointer" color="green.600" onClick={() => router.push("/register")} >Registre-se</Button></Text>
              <Text as="a" color="green.600">Esqueci minha senha</Text>
            </Stack>
          </Flex>
        </VStack>
      </Box>
    </ScaleFade>
  )
}
