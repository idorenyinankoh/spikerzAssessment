
Cypress.Commands.add('youtubeGoogleLogin', (email, password) => {

    cy.window().then((window) => {
        cy.stub(window, 'open').callsFake((url) => {
            window.location.href = url;
        });
    });

    cy.visit('https://accounts.google.com');
    cy.origin('https://accounts.google.com', { args: { email, password } }, ({ email, password }) => {
        cy.getCookies().then((cookies) => {
            cy.log('All Cookies:', cookies);
        });
        cy.get('#identifierId').type(email, { delay: 100 });
        cy.wait(1000);
        cy.contains('Next').click();
        cy.wait(2000);
        cy.contains('Restart').click()
        cy.get('innput[type="password"]')
            .type(password, { delay: 100, log: false });
        cy.wait(1000);
        cy.contains('Next').click();
    });
});

Cypress.Commands.add('withRetry', (fn, options = {}) => {
    const maxAttempts = options.maxAttempts || 3;
    const delay = options.delay || 1000;
    
    let attempts = 0;
    
    const attempt = () => {
        attempts++;
        
        try {
            return fn();
        } catch (error) {
            if (attempts === maxAttempts) {
                throw error;
            }
            cy.wait(delay);
            return attempt();
        }
    };
    
    return attempt();
});