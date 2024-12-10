import {QueryClient} from "@tanstack/react-query";
import {type ActionFunctionArgs, redirect} from "react-router-dom";
import {deleteContact} from "../asyncRequests";

export const action = (queryClient: QueryClient) =>
    async function ({params}: ActionFunctionArgs) {
        if (!params.contactId) {
            throw new Error("No contact ID provided");
        }

        await deleteContact(params.contactId);

        queryClient.invalidateQueries({queryKey: ["contacts"]});

        return redirect("/contacts-manager");
    };
