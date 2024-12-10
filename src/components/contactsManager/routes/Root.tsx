import type {QueryClient} from "@tanstack/react-query";
import {queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import {useState} from "react";
import type {LoaderFunctionArgs} from "react-router-dom";
import {Link, NavLink, Outlet, useNavigation, useSearchParams, useSubmit} from "react-router-dom";
import {getContacts} from "../asyncRequests";

const contactListQuery = (q?: string) =>
    queryOptions({
        queryKey: ["contacts", "list", q ?? "all"],
        queryFn: () => getContacts(q)
    });

export const loader = (queryClient: QueryClient) =>
    async function ({request}: LoaderFunctionArgs) {
        const url = new URL(request.url);
        const q = url.searchParams.get("q") ?? "";

        await queryClient.ensureQueryData(contactListQuery(q));

        return {q};
    };

export default function Root() {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const [searchParams] = useSearchParams();
    const q = searchParams.get("q") ?? "";
    const {data: contacts} = useSuspenseQuery(contactListQuery(q));

    const navigation = useNavigation();
    const isSearching = navigation.state === "loading" && navigation.location.state?.source === "search";
    const isBusy = !!timeoutId || isSearching;

    const submit = useSubmit();

    function handleChange(form: HTMLFormElement | null) {
        clearTimeout(timeoutId);

        const id = setTimeout(() => {
            submit(form, {state: {operation: "search"}});
            setTimeoutId(undefined);
        }, 500);

        setTimeoutId(id);
    }

    return (
        <div id="app-root">
            <div id="sidebar">
                <header>
                    <h1>
                        <Link to="/contacts-manager">React Router Contacts</Link>
                    </h1>
                </header>
                <div role="region">
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            key={q}
                            autoFocus
                            defaultValue={q}
                            className={isBusy ? "loading" : ""}
                            onChange={(event) => handleChange(event.currentTarget.form)}
                        />
                        <div id="search-spinner" aria-hidden hidden={!isBusy} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <Link to="contacts/new" className="button" aria-label="New Contact">
                        New
                    </Link>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`/contacts-manager/contacts/${contact.id}`}
                                        className={({isActive, isPending}) =>
                                            isActive ? "active" : isPending ? "pending" : ""
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <main id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </main>
        </div>
    );
}
