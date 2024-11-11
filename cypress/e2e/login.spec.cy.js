import userData from '../fixtures/users/userData.json'
import LoginPage from '../pages/loginPage.js';
import DashboardPage from '../pages/dashboardPages.js';
import { generateRandomName } from '../support/utils.js';

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()


describe('Login Orange HRM test', () => {
 
  let users;
  // it('login fail', () => {
  //     loginPage.accesLoginPage()
  //     loginPage.loginWithUser(userData.userFail.username,userData.userFail.password)
  //     loginPage.checkAccessInvalid()
  // });

  it('Verify Record Number', () => {
    loginPage.accesLoginPage()
    loginPage.loginWithUser(userData.userSucess.username,userData.userSucess.password)
    //dashboardPage.checkDashboardPage();
    cy.get(':nth-child(1) > .oxd-main-menu-item > .oxd-text').click({force:true})
    cy.wait(2000)

    cy.get('.oxd-table-body div.oxd-table-card').its('length').then((rowCount) => {
      users = rowCount + 1;
      console.log(users);
    }).then(() => {
      cy.get('.orangehrm-header-container > .oxd-button').click({force:true});
      cy.wait(2000);
      cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').type('admin{enter}')
      cy.wait(2000);
      const randomUppercaseLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      cy.get('.oxd-autocomplete-text-input > input').type(randomUppercaseLetter);
      cy.wait(2000);
      cy.get('div.oxd-autocomplete-dropdown').eq(0).click();
      cy.wait(2000);
      const userName = generateRandomName();
      cy.get('input[class="oxd-input oxd-input--active"]').eq(1).type(userName);
      cy.wait(2000);
      cy.get('[type="password"]').eq(0).type('Testing@123');
      cy.get('[type="password"]').eq(1).type('Testing@123');

      cy.get('[class="oxd-select-wrapper"]').eq(1).click();
      cy.get('[class="oxd-select-option"]').eq(1).click();
      cy.get('[type="submit"]').click();
      cy.wait(7000);
      cy.get('span[data-v-5a621acd]').should('contain.text', ` (${users}) Records Found`);

      cy.get('form [class="oxd-input oxd-input--active"]').type(userName);
      cy.get('[type="submit"]').click();
      cy.wait(6000);
      cy.get('.oxd-table-cell-actions .bi-trash').click();
      cy.get('.oxd-button--label-danger').click();
      cy.get('.oxd-form-actions [type="button"]').click();
      cy.get('span[data-v-5a621acd]').should('contain.text', ` (${users-1}) Records Found`);
   })
  })
})

