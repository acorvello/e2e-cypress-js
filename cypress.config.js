const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_baseUrl || "http://localhost:3000",
    video: true,
    screenshotOnRunFailure: true,
    reporter: "cypress-multi-reporters",
    reporterOptions: {
      reporterEnabled: "spec, mocha-junit-reporter",
      mochaJunitReporterReporterOptions: {
        mochaFile: "results/junit-[hash].xml",
        toConsole: false,
        // classname = "<prefix>.<describe>"; o Jenkins separa pacote e classe
        // pelo último ponto, então o describe NÃO pode conter pontos.
        jenkinsMode: true,
        jenkinsClassnamePrefix: "cypress.tests",
      },
    },
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
