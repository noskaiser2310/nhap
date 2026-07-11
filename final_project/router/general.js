const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }
  return res.status(404).json({message: "Book not found"});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
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
  return res.status(200).json({booksbyauthor: booksByAuthor});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
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
  return res.status(200).json({booksbytitle: booksByTitle});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }
  return res.status(404).json({message: "Book not found"});
});


// =========================================================================
// TASK 10-13 (Task 11 for Rubric): AXIOS / ASYNC-AWAIT / PROMISES IMPLEMENTATION
// =========================================================================

// Task 10: Get all books using async/await and Axios
const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}

// Task 11: Get book details by ISBN using Promise Callbacks and Axios
const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching book by ISBN:", error);
    });
}

// Task 12: Get book details by Author using async/await and Axios
const getBookByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching book by author:", error);
    }
}

// Task 13: Get book details by Title using async/await and Axios
const getBookByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        console.log(response.data);
    } catch (error) {
        console.error("Error fetching book by title:", error);
    }
}

module.exports.general = public_users;
