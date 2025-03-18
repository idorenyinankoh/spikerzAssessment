class GoogleAuthPage {
    elements = {
        emailInput: 'input[type="email"]',
        passwordInput: 'input[type="password"]',
        nextButton: '#identifierNext',
        passwordNext: '#passwordNext'
    }

    inputEmail() {
        return this.elements.emailInput;
    }
    inputPassword() {
        return this.elements.passwordInput;
    }

}

export default new GoogleAuthPage();
