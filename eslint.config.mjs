import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pluginNext from "@next/eslint-plugin-next";
import configPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";
import pluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import ts from "typescript-eslint";

const compat = new FlatCompat();

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	js.configs.recommended,
	...ts.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"unicorn/template-indent": "off", // Disable template indentation rule
			"unicorn/no-array-for-each": "off", // Allow array forEach
			"unicorn/catch-error-name": "off", // Don't enforce naming 'error' in catch
			"@typescript-eslint/no-explicit-any": "off", // Allow explicit any
			"@typescript-eslint/explicit-module-boundary-types": "off"

		},
	},
	configPrettier,
	pluginImport.flatConfigs.recommended,
	...compat.extends("plugin:import/typescript"),
	{
		settings: {
			"import/resolver": {
				typescript: true,
				node: true,
				alias: {
					map: [["@", "./src"]],
					extensions: [".js", ".jsx"],
				},
			},
		},
	},
	pluginUnicorn.configs["flat/recommended"],
	{
		rules: {
			"unicorn/prevent-abbreviations": "off",
			"unicorn/no-null": "off",
			"unicorn/no-nested-ternary": "off",
			"unicorn/no-array-reduce": "off",
			"unicorn/template-indent": "off", // Disable template indentation rule
			"unicorn/no-array-for-each": "off", // Allow array forEach
			"unicorn/catch-error-name": "off", // Don't enforce naming 'error' in catch
		},
	},
	pluginReact.configs.flat.recommended,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"react/prop-types": "off",
		},
	},
	...compat.extends("plugin:react-hooks/recommended"),
	...compat.config(pluginNext.configs.recommended),
];
