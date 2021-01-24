import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";

const token = localStorage.getItem("_user")

const httpLink = createHttpLink({
    uri: "http://localhost:5000",
});

const authLink = setContext(() => ({
    headers: {
        Authorization: token ? `Bearer ${token}`: "",
    }
}))

const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
