import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme';
import Header from '../components/Header';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from '../context/userContext'
import { useState } from 'react';
const queryClient = new QueryClient();


function MyApp({ Component, pageProps }) {
  let user = {}
  return (
    <ChakraProvider theme={theme}>
      <UserProvider >
        <QueryClientProvider client={queryClient}>
          <Header />
          <Component {...pageProps} />
        </QueryClientProvider>
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp
