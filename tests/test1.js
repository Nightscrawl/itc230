const expect = require("chai").expect;
const book = require("../lib/data");


describe("Dragon Age novels", () => {
    it("returns book info by title", () => {
        const result = book.getItem("Asunder");
        expect(result).to.deep.equal( {title: "Asunder", author: "David Gaider", year: 2011, pages: 448} );
    });
    
    it("fails w/ invalid book", () => {
        const result = book.getItem("Some Book");
        expect(result).to.equal("Some Book is not in the database.");
    });
});


describe("add a novel to the database", () => {
    it("fails if entered book is present", () => {
        const result = book.addItem("Asunder", "David Gaider", 2011, 448);
        expect(result).to.equal("Asunder is already in the database.");
    });

    it("adds a new book to the list", () => {
        const result = book.addItem("New Book", "John Smith", 1999, 666);
        expect(result).to.equal("New Book has been added.");
    });
});


describe("removes a novel from the database", () => {
    it("removes item", () => {
        const result = book.delItem("Asunder");
        expect(result).to.equal("Asunder has been removed.");
    });

    it("fails if item doesn't exist", () => {
        const result = book.delItem("Some Book");
        expect(result).to.equal("Some Book does not exist in the database. No items removed.");
    });
});