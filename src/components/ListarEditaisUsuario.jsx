import { Heading, Text, VStack } from "@chakra-ui/react";


export default function ListarEditaisUsuario({ editais }) {
    console.log(editais)
    if (editais != undefined) {
        return (
            <>
                <Heading fontWeight="semibold" fontSize="1.2rem">Projetos enviados:</Heading>
                <VStack minH="350px" w="100%" align="start">

                    {editais.map((edital, key) => (
                        <VStack
                            key={key}
                            w="90%"
                            border="1px"
                            borderRadius="8px"
                            spacing="0.7rem"
                            p="1rem"
                            align="start"
                        >
                            <Heading fontSize="1.2rem">{edital.TITULO}</Heading>
                            <Text>{edital.DESCRICAO}</Text>
                        </VStack>
                    ))}
                </VStack>
            </>
        );
    }
    else return "deu ruim"
}