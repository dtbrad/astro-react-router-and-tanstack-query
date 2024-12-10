import {Contact, db} from "astro:db";

const initialData = [
    {
        avatar: "https://avatars.githubusercontent.com/u/5580297?v=4",
        createdAt: 1660978713047,
        favorite: false,
        first: "Tanner",
        id: "usupkc1",
        last: "Linsley",
        notes: "Created React Query",
        twitter: "@tannerlinsley"
    },
    {
        avatar: "https://avatars.githubusercontent.com/u/1021430",
        createdAt: 1660979124264,
        favorite: true,
        first: "Dominik",
        id: "kvvztl7",
        last: "D",
        notes: "Maintains React Query",
        twitter: "@tkdodo"
    }
];

export default async function seed() {
    await db.insert(Contact).values(initialData);
}
