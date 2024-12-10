import dbDeleteContact from "@db/dbDeleteContact";
import dbGetContactById from "@db/dbGetContactById";
import dbUpdateContact from "@db/dbUpdateContact";
import {type APIContext} from "astro";

export async function GET({params}: APIContext) {
    const {id} = params;

    const contact = await dbGetContactById(id!);

    return new Response(JSON.stringify(contact), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function PATCH({params, request}: APIContext) {
    const {id} = params;
    const updates = await request.json();

    await dbUpdateContact(id!, updates);

    return new Response(null, {status: 204});
}

export async function DELETE({params}: APIContext) {
    const {id} = params;

    await dbDeleteContact(id!);

    return new Response(null, {status: 204});
}

// keeping around for testing/debugging purposes

// export async function PATCH() {
//     return new Response(null, {
//         status: 500,
//         statusText: "Simulated server error for testing purposes"
//     });
// }
