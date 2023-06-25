const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsBuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
	reporter: 'mochawesome',
	reporterOptions: {
		reportDir: 'cypress/results',
		overwrite: false,
		chart: true,
		html: false,
		json: true,
	},
	e2e: {
		async setupNodeEvents(on, config) {
			require('cypress-mochawesome-reporter/plugin')(on);
			// implement node event listeners here
			const bundler = createBundler({
				plugins: [createEsBuildPlugin(config)],
			});
			on("file:preprocessor", bundler);
			await addCucumberPreprocessorPlugin(on, config);
			return config;
		},
		specPattern: ["cypress/e2e/*.feature","cypress/e2e/*.spec.cy.ts"],

		video:false,
		viewportHeight: 1080,
		viewportWidth: 1920,
		},
});