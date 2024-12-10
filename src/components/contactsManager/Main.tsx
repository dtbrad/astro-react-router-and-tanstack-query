import {
    HydrationBoundary,
    isServer,
    QueryClient,
    QueryClientProvider,
    type DehydratedState
} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import React from "react";
import type {StaticHandlerContext} from "react-router-dom";
import {queryClientConfig} from "../../queryClientConfig";
import Router from "./Router";
import CreateRoutes from "./CreateRoutes";

function makeQueryClient() {
    return new QueryClient(queryClientConfig);
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    }

    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
}

export default function Main({context, state}: {context: StaticHandlerContext; state: DehydratedState}) {
    const queryClient = getQueryClient();
    const routes = CreateRoutes(queryClient);

    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={state}>
                    <Router context={context} routes={routes} />
                </HydrationBoundary>
                <ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>
    );
}
