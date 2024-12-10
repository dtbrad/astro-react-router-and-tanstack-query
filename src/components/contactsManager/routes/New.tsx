import {QueryClient} from "@tanstack/react-query";
import {redirect, type ActionFunctionArgs} from "react-router-dom";
import {createContact} from "../asyncRequests";
import {ContactForm} from "./Edit";

export const action =
    (queryClient: QueryClient) =>
    async ({request}: ActionFunctionArgs) => {
        const formData = await request.formData();
        const data = Object.fromEntries(formData);

        const contact = await createContact(data);

        await queryClient.invalidateQueries({queryKey: ["contacts", "list"]});

        return redirect(`/contacts-manager/contacts/${contact.id}`);
    };

export default function New() {
    return <ContactForm />;
}
