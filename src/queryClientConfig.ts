import type {QueryClientConfig} from "@tanstack/react-query";

export const queryClientConfig: QueryClientConfig = {
    defaultOptions: {
        queries: {
            staleTime: 1000 * 10
        }
    }
};
