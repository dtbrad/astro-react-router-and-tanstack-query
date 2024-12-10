import {Contact, db, like, or} from "astro:db";

export default async function dbGetContacts(searchTerm?: string) {
    if (!searchTerm) {
        return await db.select().from(Contact);
    }

    return await db
        .select()
        .from(Contact)
        .where(or(like(Contact.first, `%${searchTerm}%`), like(Contact.last, `%${searchTerm}%`)));
}
