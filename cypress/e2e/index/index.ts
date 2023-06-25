import { Given , Then , When} from "@badeball/cypress-cucumber-preprocessor";
Given ('A user open cypress page',()=>{
    cy.visit('https://example.cypress.io')
})
When ('A user click commands',()=>{
    cy.get('.dropdown-toggle').click();
})