import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import {useApolloClient}  from '../../hooks/useApolloClient'
import { DataProvider } from '../../context/DataContext'
export default function App({ Component, pageProps }: AppProps) {
  const {client} = useApolloClient()
  return (
    <ApolloProvider
      client={client}
    >
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ApolloProvider>
  )
}
