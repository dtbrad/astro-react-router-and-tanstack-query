export default function Index() {
    return (
        <div id="about-contacts-manager">
            <p>
                This is an adaptation of the @tanstack/react-query react-router{" "}
                <a
                    href="https://github.com/TanStack/query/tree/main/examples/react/react-router"
                    rel="noopener noreferrer "
                    target="_blank"
                >
                    example app
                </a>{" "}
                (itself an adaptation of the react-router tutorial app) that runs inside a single page of an Astro app.
                Changes include:
            </p>
            <ul>
                <li>Adds SSR</li>
                <li>Replaces localforage with API endpoints and astro:db</li>
            </ul>
        </div>
    );
}
