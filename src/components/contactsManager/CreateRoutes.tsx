import {QueryClient} from "@tanstack/react-query";
import {type RouteObject} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Contact, {action as contactAction, loader as contactLoader} from "./routes/Contact";
import {action as destroyAction} from "./routes/destroy";
import EditContact, {action as editAction} from "./routes/Edit";
import Index from "./routes/Index";
import New, {action as newAction} from "./routes/New";
import Root, {loader as rootLoader} from "./routes/Root";

export default function CreateRoutes(queryClient: QueryClient) {
    const routes: RouteObject[] = [
        {
            path: "/contacts-manager",
            element: <Root />,
            errorElement: <ErrorPage />,
            loader: rootLoader(queryClient),
            children: [
                {
                    index: true,
                    element: <Index />
                },
                {
                    path: "contacts/new",
                    element: <New />,
                    action: newAction(queryClient),
                    errorElement: <ErrorPage />
                },
                {
                    path: "contacts/:contactId",
                    element: <Contact />,
                    loader: contactLoader(queryClient),
                    action: contactAction(queryClient),
                    errorElement: <ErrorPage />
                },
                {
                    path: "contacts/:contactId/edit",
                    element: <EditContact />,
                    loader: contactLoader(queryClient),
                    action: editAction(queryClient),
                    errorElement: <ErrorPage />
                },
                {
                    path: "contacts/:contactId/destroy",
                    element: <EditContact />,
                    action: destroyAction(queryClient),
                    errorElement: <ErrorPage />
                }
            ]
        }
    ];

    return routes;
}
