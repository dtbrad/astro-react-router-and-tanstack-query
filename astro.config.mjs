import {defineConfig} from "astro/config";
import react from "@astrojs/react";

import db from "@astrojs/db";

export default defineConfig({
    integrations: [react(), db()],
    output: "server",
    redirects: {
        "/": "/contacts-manager"
    }
});