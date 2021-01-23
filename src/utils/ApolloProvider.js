import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

function Provider ({ children }) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
};

export default Provider;
