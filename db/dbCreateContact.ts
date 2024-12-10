import type {Contact as ContactType} from "@types";
import {Contact, db} from "astro:db";

export default async function dbCreateContact(newContact: ContactType) {
    await db.insert(Contact).values(newContact);
}
