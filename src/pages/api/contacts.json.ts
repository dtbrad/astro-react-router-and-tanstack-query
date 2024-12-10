import {type APIContext} from "astro";
import {v4 as uuid} from "uuid";
import dbCreateContact from "@db/dbCreateContact";
import dbGetContacts from "@db/dbGetContacts";

export async function GET({request}: APIContext) {
    const searchParams = new URL(request.url).searchParams;
    const filter = searchParams.get("filter") ?? "";

    const contacts = (await dbGetContacts(filter)).map((contact) => ({
        ...contact,
        favorite: !!contact.favorite
    }));

    return new Response(JSON.stringify(contacts), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

export async function POST({request}: APIContext) {
    const {first, last, twitter, avatar, notes} = await request.json();
    const newId = uuid();

    await dbCreateContact({
        first,
        last,
        twitter,
        avatar,
        notes,
        favorite: false,
        createdAt: Date.now(),
        id: newId
    });

    return new Response(JSON.stringify({message: "success", id: newId}), {status: 201});
}
