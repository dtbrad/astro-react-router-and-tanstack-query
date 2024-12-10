import {column, defineDb, defineTable} from "astro:db";

const Contact = defineTable({
    columns: {
        id: column.text({primaryKey: true}),
        avatar: column.text(),
        createdAt: column.number(),
        favorite: column.boolean(),
        first: column.text(),
        last: column.text(),
        notes: column.text(),
        twitter: column.text({optional: true})
    }
});

export default defineDb({
    tables: {Contact}
});
