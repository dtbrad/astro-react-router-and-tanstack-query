# React Router, TanStack Query, SSR and Astro Example

This is an adaptation of the @tanstack query react router example app (itself an adaptation of the react-router tutorial app) for use inside a single page of an Astro app. Changes include:

- Integrates react-router and @tanstack query into SSR
- Replaces localforage with API endpoints and astro:db

To run locally:

`yarn`
`yarn dev`

References:

- https://tkdodo.eu/blog/react-query-meets-react-router
- https://github.com/TanStack/query/pull/4058
- https://github.com/TanStack/query/tree/main/examples/react/react-router
