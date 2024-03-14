import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
    i18n: {
        defaultLocale: "hu",
        locales: ["hu", "en"],
        routing: {
            prefixDefaultLocale: false,
        },
    },

    integrations: [react()],
});
