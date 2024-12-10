import {default as astrojs, default as eslintPluginAstro} from "eslint-plugin-astro";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactHooksExtra from "eslint-plugin-react-hooks-extra";
import globals from "globals";
import tseslint from "typescript-eslint";

const config = tseslint.config(
    {ignores: ["dist", "**/*.d.ts"]},
    {
        extends: [
            ...astrojs.configs.recommended,
            ...tseslint.configs.recommended,
            ...eslintPluginAstro.configs.recommended
        ],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            "react-hooks": reactHooks,
            "react-hooks-extra": reactHooksExtra,
            astro: eslintPluginAstro,
            react: reactPlugin
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            "react/prop-types": "off",
            "react-hooks/exhaustive-deps": "error",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react-hooks-extra/no-redundant-custom-hook": "warn",
            "react-hooks-extra/no-direct-set-state-in-use-effect": "warn",
            "react-hooks-extra/prefer-use-state-lazy-initialization": "warn",
            "react/jsx-filename-extension": [2, {extensions: [".js", ".jsx", ".ts", ".tsx"]}]
        }
    }
);

export default config;
