Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Sample App Test Flow", function () {
  beforeEach(() => {
    cy.task("getLogin").then((token) => {
      cy.visit({
        method: "GET",
        url: "/SitePages/SPFx-Template.aspx",
        headers: token.headers,
      });
    });

    cy.wait(2000) 
  }); 
 
  it("Should have a title of SPFx Template", function () {
    cy.title().should("contain", "SPFx Template");
  });

  it("Should click on example link", function () {
    cy.get('[href="#/examples"]').click();
  });
});
