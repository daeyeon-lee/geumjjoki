/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      socialLogin(): Chainable<void>;
    }
  }
}
Cypress.Commands.add('socialLogin', () => {
  // 실제 소셜 로그인은 외부 리다이렉트가 필요하므로,
  const apiUrl = Cypress.env('apiUrl');
  // 테스트용 유저로 직접 토큰을 받아오는 API를 호출하는 방식으로 대체합니다.
  cy.request('POST', `${apiUrl}/auth/email-login/`, {
    email: 'test@example.com',
    password: 'testpass123'
  }).then((response) => {
    const { access_token, refresh_token } = response.body;
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
  });
});

export {}