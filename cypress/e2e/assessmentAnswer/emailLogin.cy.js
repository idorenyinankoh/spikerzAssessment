/// <reference types="cypress" />
import YouTubePage from '../../fixtures/pageObjects/YouTubePage';
import GoogleAuthPage from '../../fixtures/pageObjects/GoogelAuthPage';

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
  linkedIn: 'https://px.ads.linkedin.com/wa/',
  pipedream: 'https://pipedream.wistia.com/mput?topic=metrics'
};


describe('example to-do app', () => {
  // cypress/e2e/social-connect/youtube-login.cy.js

  describe('YouTube Social Connection', () => {
    beforeEach(() => {
      // Visit the application
      cy.visit(Cypress.env('testUrl') + '/social-connect/');

      // Verify page load
      cy.url().should('include', '/social-connect');
    });

    it('should successfully connect YouTube account', () => {
      // Arrange
      const expectedSuccessMessage = 'Successfully connected YouTube account';

      // Act
      YouTubePage.clickYouTubeTile();
      YouTubePage.clickGoogleConnect();

      // Assert
      cy.withRetry(() => {
        cy.fixture("testData/authData").then((data) => {
          cy.youtubeGoogleLogin(GoogleAuthPage.elements.emailInput, GoogleAuthPage.elements.emailInput);
        });
      }, {
        maxAttempts: 3,
        delay: 1000
      });

      // Verify successful connection
      cy.url().should('include', '/social-connect');
      cy.contains(expectedSuccessMessage).should('be.visible');

      // Verify API response
      cy.wait('@connectionAPI')
        .its('response.statusCode')
        .should('equal', 200);
    });

    it('should handle invalid credentials', () => {
      // Act
      YouTubePage.clickYouTubeTile();
      YouTubePage.clickGoogleConnect();

      // Assert
      cy.withRetry(() => {
        GoogleAuthPage.login(
          'invalid@email.com',
          'invalidPassword'
        );
      });

      cy.contains('Invalid credentials').should('be.visible');
    });

    it('should handle network errors', () => {
      // Simulate network error
      cy.intercept('POST', '**/oauth/connect', {
        forceNetworkError: true
      }).as('networkError');

      // Act
      YouTubePage.clickYouTubeTile();
      YouTubePage.clickGoogleConnect();

      // Assert
      cy.contains('Connection failed. Please try again.').should('be.visible');
    });
  });

})
