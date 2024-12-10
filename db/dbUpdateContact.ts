import {type Contact as ContactType} from "@types";
import {Contact, db, eq} from "astro:db";

export default async function dbUpdateContact(id: string, updateFields: Partial<ContactType>) {
    const updates = Object.fromEntries(Object.entries(updateFields).filter(([, value]) => value !== undefined));

    if (Object.keys(updates).length === 0) {
        throw new Error("No fields to update.");
    }

    await db.update(Contact).set(updates).where(eq(Contact.id, id));
}
