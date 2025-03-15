/// <reference types="cypress" />

const GOOGLE_URL = "https://accounts.google.com";
const endpoints = {
  visualWebsiteOptimizer: 'https://dev.visualwebsiteoptimizer.com/j.php?a=*',
  wistiaMedias: [
    'https://fast.wistia.com/embed/medias/5sy184whhj.json',
    'https://fast.wistia.com/embed/medias/kj43p1nvn6.json',
    'https://fast.wistia.com/embed/medias/w3g1lcmha3.json',
    'https://fast.wistia.com/embed/captions/v1dnmb8zrf.json',
    'https://fast.wistia.com/embed/captions/kj43p1nvn6.json',
    'https://fast.wistia.com/embed/captions/w3g1lcmha3.json',
    'https://fast.wistia.com/embed/captions/5sy184whhj.json',
  ],
  hubApi: 'https://api.hubapi.com/hs-script-loader-public/v1/config/pixels-and-events/json?portalId=*',
  googleAnalytics: [
    'https://www.google-analytics.com/g/collect?v=2&tid=*',
    'https://www.google-analytics.com/g/collect?v=2&tid=*',
  ],
  assets: [
    '/assets/il18n/en/account_setup.json',
    '/assets/il18n/en/accounts_summary.json',
    '/assets/il18n/en/authenticator.json',
    '/assets/il18n/en/bot_detector.json',
    '/assets/il18n/en/content_quality.json',
    '/assets/il18n/en/account_selection.json',
    '/assets/il18n/en/data_breaches.json',
    '/assets/il18n/en/dm_checker.json',
    '/assets/il18n/en/feature_preview.json',
    '/assets/il18n/en/i10n.json',
    '/assets/il18n/en/input_phone.json',
    '/assets/il18n/en/insights.json',
    '/assets/il18n/en/menu.json',
    '/assets/il18n/en/overview.json',
    '/assets/il18n/en/permissions.json',
    '/assets/il18n/en/platform_account_summary.json',
    '/assets/il18n/en/secure_inbox.json',
    '/assets/il18n/en/questionnaires.json',
    '/assets/il18n/en/shadowban.json',
    '/assets/il18n/en/social_media_permissions.json',
    '/assets/il18n/en/toolbar.json',
    '/assets/il18n/en.json',
    '/assets/mocks/info.json',
  ],
  // reddit: [
  //   'https://www.redditstatic.com/ads/conversions-config/v1/pixel/config/*',
  //   'https://pixel-config.reddit.com/pixels/*',
  // ],
  linkedIn: 'https://px.ads.linkedin.com/wa/',
  pipedream: 'https://pipedream.wistia.com/mput?topic=metrics'
  // mixpanel: [
  //   'https://api-js.mixpanel.com/track/?verbose=1&ip=1',
  //   'https://api-js.mixpanel.com/engage/?verbose=1&ip=1',
  // ],
};


describe('example to-do app', () => {
  beforeEach(() => {

    // Intercept and validate each API call
    // cy.intercept('GET', endpoints.visualWebsiteOptimizer).as('visualWebsiteOptimizer');
    // endpoints.wistiaMedias.forEach(url => {
    //   cy.intercept('GET', url).as('wistiaMedia');
    // });
    // cy.intercept('GET', endpoints.hubApi).as('hubApi');
    // endpoints.googleAnalytics.forEach(url => {
    //   cy.intercept('POST', url).as('googleAnalytics');
    // });
    // endpoints.assets.forEach(url => {
    //   cy.intercept('GET', url).as('asset');
    // });

    // cy.intercept('POST', endpoints.linkedIn).as('linkedIn');
    // cy.intercept('POST', endpoints.pipedream).as('pipedream');

    // navigating to social connect
    cy.visit(Cypress.env("testUrl") + '/social-connect/')

    // Wait for all intercepts and assert they return 200
    //   cy.wait('@visualWebsiteOptimizer').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   cy.wait('@hubApi').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   cy.wait('@linkedIn').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   cy.wait('@pipedream').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));

    //   endpoints.wistiaMedias.forEach(() => {
    //     cy.wait('@wistiaMedia').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   });
    //   endpoints.googleAnalytics.forEach(() => {
    //     cy.wait('@googleAnalytics').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   });
    //   endpoints.assets.forEach(() => {
    //     cy.wait('@asset').its('response.statusCode').should('satisfy', (status) => [200, 201, 204].includes(status));
    //   });
  })
  it('Login with valid details', () => {

    // clicking on youtube icon
    cy.fixture("pageObjects/clientApp").then((authObj) => {
      cy.contains(authObj.youtubeTile).click()

      // click on youtube login
      cy.get(authObj.youtubeGoogleConnect).click()

      // handling redirect to google
      cy.fixture("testData/authData").then((data) => {
        cy.youtubeGoogleLogin(data.email, data.password);
      });
    });
  });

})
