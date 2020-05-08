let DragonAgeNovels = [

    { title: 'The Stolen Throne',
      author: 'David Gaider',
      year: 2009,
      pages: 400 },

    { title: 'The Calling',
      author: 'David Gaider',
      year: 2009,
      pages: 448 },

    { title: 'Asunder',
      author: 'David Gaider',
      year: 2011,
      pages: 448 },

    { title: 'The Masked Empire',
      author: 'Patrick Weekes',
      year: 2014,
      pages: 384 },

    { title: 'Last Flight',
      author: 'Liane Merciel',
      year: 2014,
      pages: 301 }
]

exports.getAll = () => {
  return DragonAgeNovels;
}


// return a book by title
// like a for loop that searches thru and returns the title; check against name supplied to function
exports.findBook = (title) => {
  return DragonAgeNovels.find( (book) => {
    return book.title === title;
	} );
}

// checks for existing title
// if title exists, return book into; if not, return message
exports.getItem = (title) => {
  let n = this.findBook(title);
  if ( n ) {
    return DragonAgeNovels.find( (book) => {
      return book.title === title;
    } );
  } else {
    return `${title} is not in the database.`;
  }
}


// DONE
// adds a new book to the array
exports.addItem = (newTitle, newAuthor, newYear, newPages) => {
  let n = this.findBook(newTitle);
  if ( n ) {
    return `${newTitle} is already in the database.`;
  } else {
    DragonAgeNovels.push( { title: newTitle, author: newAuthor, year: newYear, pages: newPages } );
    return `${newTitle} has been added.`;
  }  
}


// DONE
// deletes an item from the array via book title
exports.delItem = (title) => {
  let n = this.findBook(title);
  let i = DragonAgeNovels.indexOf(this.getItem(title));
  if ( n ) {
    DragonAgeNovels.splice(i, 1);
    return `${title} has been removed.`;
  } else {
    return `${title} does not exist in the database. No items removed.`;
  }
}



// TESTS -------------------------------------------------

// test check for existant novel
// console.log(this.getItem("Asunder"));

// test check for non-existant novel
// console.log(this.getItem("Some Novel"));

// test add new novel
// console.log(this.addItem("New Book", "John Smith", 1999, 666));
// console.log(this.getAll());

// // test check for existing new novel
// console.log(this.addItem("Asunder", "David Gaider", 2011, 448));
// console.log(this.getAll());

// test check delete a novel
// console.log(DragonAgeNovels.length);
// console.log(this.delItem("The Stolen Throne"));
// console.log(DragonAgeNovels.length);
// console.log(this.getAll());


// misc
// console.log(JSON.stringify(this.getItem("Asunder")));
