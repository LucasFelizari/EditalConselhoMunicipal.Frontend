import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsWhatsapp } from 'react-icons/bs';
import { FiInstagram } from 'react-icons/fi';
import { TbMapSearch } from 'react-icons/tb';
import { useRouter } from 'next/router';


export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    return (
        <>
            <Box bg="green.700" minH="250px" p="2rem" color="whiteAlpha.900">
                <HStack justifyContent="space-between">
                    <Button bg="transparent" onClick={onOpen}>
                        <GiHamburgerMenu fontSize="1.2rem" />
                    </Button>
                    <HStack spacing="1.5rem">
                        <BsWhatsapp fontSize="1.4rem" />
                        <FiInstagram fontSize="1.4rem" />
                        <TbMapSearch fontSize="1.4rem" />
                    </HStack>
                </HStack>
            </Box>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay sx={{ backdropFilter: "blur(1px)" }} />
                <DrawerContent bg={"green.700"} color={"white"}>
                    <DrawerCloseButton />
                    <DrawerHeader>Conselho Municipal de Cultura</DrawerHeader>
                    <DrawerBody>
                        <Button
                            onClick={() => {
                                onClose();
                                router.push("/");
                            }}
                            w={"full"}
                            borderRadius={0}
                            size={"md"}
                            justifyContent={"start"}
                            colorScheme={"green.700"}
                            p={"1.5em"}
                            fontSize={"lg"}
                            fontWeight="normal"
                            _hover={{
                                bg: "green.900",
                            }}
                        >
                            <Box>Login</Box>
                        </Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}