const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    defaultCommandTimeout: 40000,
    pageLoadTimeout: 120000, 
    requestTimeout: 40000,  
    responseTimeout: 30000,
    watchForFileChanges: true,
    env: {
      testUrl:'https://me:SmipMe123456@demo.spikerz.com/'

    },
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    setupNodeEvents(on, config) {
     
    },
  },
});


