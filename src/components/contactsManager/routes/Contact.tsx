import {QueryClient, queryOptions, useSuspenseQuery} from "@tanstack/react-query";
import type {Contact} from "@types";
import {type ActionFunctionArgs, Form, Link, type LoaderFunctionArgs, useFetcher, useParams} from "react-router-dom";
import {getContactById, updateContact} from "../asyncRequests";

export const contactDetailQuery = (id: string) =>
    queryOptions({
        queryKey: ["contacts", "detail", id],
        queryFn: async () => {
            const contact = await getContactById(id);

            if (!contact) {
                throw new Error("Contact not found"); // is invoked on client, impossible to repro with current code
            }

            return contact;
        }
    });

export const loader = (queryClient: QueryClient) =>
    async function ({params}: LoaderFunctionArgs) {
        if (!params.contactId) {
            throw new Error("No contact ID provided");
        }

        const contact = await queryClient.ensureQueryData(contactDetailQuery(params.contactId));

        if (!contact) {
            throw new Error("Contact not found"); // is invoked server side because db query called directly from .astro page file
        }
        return {contactId: params.contactId};
    };

export const action = (queryClient: QueryClient) =>
    async function ({request, params}: ActionFunctionArgs) {
        const formData = await request.formData();

        if (!params.contactId) {
            throw new Error("No contact ID provided");
        }

        await updateContact(params.contactId, {
            favorite: formData.get("favorite") === "true"
        });

        await queryClient.invalidateQueries({queryKey: ["contacts"]});

        return null;
    };

export default function Contact() {
    const params = useParams();
    const {data: contact} = useSuspenseQuery(contactDetailQuery(params.contactId!));

    return (
        <div id="contact">
            <div>
                <img key={contact.avatar} src={contact.avatar || undefined} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p>
                        <a target="_blank" rel="noreferrer" href={`https://twitter.com/${contact.twitter}`}>
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Link to="edit" className="button">
                        Edit
                    </Link>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (!confirm("Please confirm you want to delete this record.")) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

function Favorite({contact}: {contact: Contact}) {
    const fetcher = useFetcher({key: `contact:${contact.id}`});
    let favorite = contact.favorite;
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                title={favorite ? "Remove from favorites" : "Add to favorites"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
