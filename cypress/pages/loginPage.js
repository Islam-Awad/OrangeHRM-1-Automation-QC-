class LoginPage {

    selectorsList(){
        const selectors = {
            usernameField: "[name='username']",
            passwordField: "[name='password']",
            loginButton: "[type='submit']",
            wrongCredentialAlert: "[role='alert']",
        }

        return selectors
    }

    accesLoginPage(){
        cy.visit('/auth/login')  
        cy.wait(3000); 
    }

    loginWithUser(username, password){
        cy.get(this.selectorsList().usernameField).type(username)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().loginButton).click()
        
    }

    checkAccessInvalid(){
        cy.get(this.selectorsList().wrongCredentialAlert)
    }

}

export default LoginPage