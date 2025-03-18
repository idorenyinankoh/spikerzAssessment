class YouTubePage {
  elements = {
      youtubeTile: () => cy.get('.select-platform > :nth-child(4)'),
      googleConnectBtn: ()=> cy.get('.google-and-youtube-login-container > div > app-button > .ant-btn')
  }

  clickYouTubeTile() {
      return this.elements.youtubeTile().click();
  }

  clickGoogleConnect() {
      return this.elements.googleConnectBtn().click();
  }
}

export default new YouTubePage();

// {
//     "youtubeTile": "Youtube",
//     "youtubeGoogleConnect": ".google-and-youtube-login-container > div > app-button > .ant-btn",
//     "gooogle":{
//       "emailField":"#identifierId",
//       "emailNext":"Next",
//       "passwordField":"#password > .aCsJod > .aXBtI > .Xb9hP > .whsOnd"
//     } 
//   }