import {QueryClient, useSuspenseQuery} from "@tanstack/react-query";
import type {Contact} from "@types";
import {Form, redirect, useNavigate, useNavigation, type ActionFunctionArgs} from "react-router-dom";
import {useParams} from "react-router";
import {updateContact} from "../asyncRequests";
import {contactDetailQuery} from "./Contact";

export const action = (queryClient: QueryClient) =>
    async function ({request, params}: ActionFunctionArgs) {
        const formData = await request.formData();
        const updates = Object.fromEntries(formData);

        if (!params.contactId) {
            throw new Error("No contact ID provided");
        }

        await updateContact(params.contactId, updates);

        queryClient.invalidateQueries({queryKey: ["contacts"]});

        return redirect(`/contacts-manager/contacts/${params.contactId}`);
    };

export default function Edit() {
    const params = useParams();
    const {data: contact} = useSuspenseQuery(contactDetailQuery(params.contactId!));

    return <ContactForm contact={contact} />;
}

export function ContactForm({contact}: {contact?: Contact; isNew?: boolean}) {
    const navigate = useNavigate();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Form
            method="post"
            id="contact-form"
            onSubmit={(e) => {
                if (isSubmitting) {
                    e.preventDefault();
                    return;
                }

                const updates = Object.fromEntries(new FormData(e.currentTarget));
                const hasChanges = Object.keys(updates).some((key) => updates[key] !== contact?.[key as keyof Contact]);

                if (!hasChanges) {
                    e.preventDefault();
                    navigate(-1);
                }
            }}
        >
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={contact?.first}
                />
                <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact?.last} />
            </p>
            <label>
                <span>Twitter</span>
                <input type="text" name="twitter" placeholder="@jack" defaultValue={contact?.twitter} />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                    name="avatar"
                    defaultValue={contact?.avatar}
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea name="notes" defaultValue={contact?.notes} rows={6} />
            </label>
            <p>
                <button type="submit" aria-busy={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                    className={isSubmitting ? "disabled" : ""}
                    type="button"
                    aria-disabled={isSubmitting}
                    onClick={() => {
                        if (!isSubmitting) {
                            navigate(-1);
                        }
                    }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}
