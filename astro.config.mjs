import {defineConfig} from "astro/config";
import react from "@astrojs/react";

import db from "@astrojs/db";

import svelte from "@astrojs/svelte";

export default defineConfig({
    integrations: [react(), db(), svelte()],
    output: "server",
    redirects: {
        "/": "/contacts-manager"
    }
});