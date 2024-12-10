import type {RouteObject} from "react-router-dom";
import {
    createBrowserRouter,
    createStaticRouter,
    RouterProvider,
    StaticRouterProvider,
    type StaticHandlerContext
} from "react-router-dom";

interface RouterProps {
    routes: RouteObject[];
    context: StaticHandlerContext;
}

export default function Router({routes, context}: RouterProps) {
    return typeof window === "undefined" ? (
        <StaticRouterProvider router={createStaticRouter(routes, context)} context={context} />
    ) : (
        <RouterProvider router={createBrowserRouter(routes)} />
    );
}
