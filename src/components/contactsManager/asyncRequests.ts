import type {Contact} from "@types";

async function randomDelay() {
    return new Promise((res) => {
        setTimeout(res, Math.random() * 800);
    });
}

export async function getContacts(q?: string): Promise<Contact[]> {
    await randomDelay();
    const response = await fetch(`/api/contacts.json?filter=${q}`);

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export async function getContactById(id: string): Promise<Contact> {
    await randomDelay();
    const response = await fetch(`/api/contacts/${id}.json`);

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return await response.json();
}

export async function createContact(data: Partial<Contact>): Promise<Contact> {
    await randomDelay();
    const response = await fetch("/api/contacts.json", {
        method: "POST",
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<void> {
    await randomDelay();
    const response = await fetch(`/api/contacts/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(updates)
    });

    if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
}

export async function deleteContact(id: string) {
    await randomDelay();
    const response = await fetch(`/api/contacts/${id}.json`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error(`Failed to delete contact: ${response.statusText}`);
    }
}
