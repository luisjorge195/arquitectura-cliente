import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client'
import { useState } from 'react'

export const useApolloClient = () =>{

    const httpLink = new HttpLink({
        uri:'http://localhost:4000'
    })
    const [client] = useState<ApolloClient<NormalizedCacheObject>>(
        new ApolloClient({
            cache: new InMemoryCache(),
            link:httpLink,
            connectToDevTools: true,
        })
    )
    return {client}
}