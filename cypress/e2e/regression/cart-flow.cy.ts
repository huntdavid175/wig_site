describe("Regression: product listing and cart flow", () => {
  beforeEach(() => {
    cy.visit("/shop");
  });

  it("shows products on the product listing page", () => {
    cy.contains("h1", "Shop").should("be.visible");
    cy.get("article").should("have.length.greaterThan", 0);
  });

  it("adds an item to cart from listing page", () => {
    cy.get("article").first().within(() => {
      cy.contains("button", "Add to cart").click();
    });

    cy.get('[role="dialog"][aria-label="Cart"]').should("be.visible");
    cy.contains("Your cart is empty.").should("not.exist");
  });

  it("increases cart quantity", () => {
    cy.get("article").first().within(() => {
      cy.contains("button", "Add to cart").click();
    });

    cy.get('[role="dialog"][aria-label="Cart"]').within(() => {
      cy.get('button[aria-label="Increase quantity"]').click();
      cy.contains("2").should("be.visible");
    });
  });

  it("removes item from cart", () => {
    cy.get("article").first().within(() => {
      cy.contains("button", "Add to cart").click();
    });

    cy.get('[role="dialog"][aria-label="Cart"]').within(() => {
      cy.get('button[aria-label^="Remove "]').click();
    });

    cy.contains("Your cart is empty.").should("be.visible");
  });

  it("redirects to checkout page from cart drawer", () => {
    cy.get("article").first().within(() => {
      cy.contains("button", "Add to cart").click();
    });

    cy.get('[role="dialog"][aria-label="Cart"]').within(() => {
      cy.contains("button", "Checkout").click();
    });

    cy.url().should("include", "/checkout");
    cy.contains("h1", "Checkout").should("be.visible");
  });
});
