import { Button, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { GiHamburgerMenu } from 'react-icons/gi';


export default function UserModal({ usuario }) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} ><GiHamburgerMenu /></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informações do usuário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack p="1.2rem" align="start">
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">Nome: </Heading>
                                <Text>{usuario.nome}</Text>
                            </HStack>
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">E-mail: </Heading>
                                <Text>{usuario.email}</Text>
                            </HStack>
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">Telefone: </Heading>
                                <Text>{usuario.telefone}</Text>
                            </HStack>
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">CPF: </Heading>
                                <Text>{usuario.cpf}</Text>
                            </HStack>
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">Endereço: </Heading>
                                <Text>{usuario.endereco}</Text>
                            </HStack>
                            <HStack>
                                <Heading fontSize="1.2rem" fontWeight="semibold">Cidade: </Heading>
                                <Text>{usuario.cidade}</Text>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}