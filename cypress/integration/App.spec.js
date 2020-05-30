
describe ('Test App', () => {

    it ('launches', () => {
        cy.visit ('/');
    });

    it('see if image in the document',()=>{
        cy.visit ('/login');
        cy.get("form").should("contain","email");
    })
});
