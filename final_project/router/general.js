const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  if (users.find((user) => user.username === username)) {
    return res.status(409).json({message: "User already exists"});
  }
  users.push({username, password});
  return res.status(200).json({message: "Customer successfully registered. Now you can login"});
});

// Task 10: Get the book list available in the shop using Promise
public_users.get('/', function (req, res) {
  let getBooks = new Promise((resolve, reject) => {
    resolve(books);
  });
  getBooks.then((b) => {
    return res.status(200).send(JSON.stringify(b, null, 4));
  });
});

// Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  let getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });
  getBookByISBN.then((book) => {
    return res.status(200).json(book);
  }).catch((err) => {
    return res.status(404).json({message: err});
  });
});
  
// Task 12: Get book details based on author using async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const getBooksByAuthor = () => {
      return new Promise((resolve, reject) => {
        const booksByAuthor = [];
        for (let isbn in books) {
          if (books[isbn].author === author) {
            booksByAuthor.push({
                isbn: isbn,
                title: books[isbn].title,
                reviews: books[isbn].reviews
            });
          }
        }
        resolve(booksByAuthor);
      });
    };
    const booksByAuthor = await getBooksByAuthor();
    return res.status(200).json({booksbyauthor: booksByAuthor});
  } catch (error) {
    return res.status(500).json({message: error.toString()});
  }
});

// Task 13: Get all books based on title using async/await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const getBooksByTitle = () => {
      return new Promise((resolve, reject) => {
        const booksByTitle = [];
        for (let isbn in books) {
          if (books[isbn].title === title) {
            booksByTitle.push({
                isbn: isbn,
                author: books[isbn].author,
                reviews: books[isbn].reviews
            });
          }
        }
        resolve(booksByTitle);
      });
    };
    const booksByTitle = await getBooksByTitle();
    return res.status(200).json({booksbytitle: booksByTitle});
  } catch (error) {
    return res.status(500).json({message: error.toString()});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.general = public_users;
