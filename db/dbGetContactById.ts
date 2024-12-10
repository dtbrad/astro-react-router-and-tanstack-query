import {Contact, db, eq} from "astro:db";

export default async function dbGetContactById(id: string) {
    const result = await db.select().from(Contact).where(eq(Contact.id, id)).limit(1);

    return result[0] || null;
}
