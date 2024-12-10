import {Contact, db, eq} from "astro:db";

export default async function dbDeleteContact(id: string) {
    await db.delete(Contact).where(eq(Contact.id, id));
}
