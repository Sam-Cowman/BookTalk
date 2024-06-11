// public/js/books.js
const addBookForm = document.querySelector('#add-book-form');
const bookList = document.querySelector('#book-list');

const fetchBooks = async () => {
  const response = await fetch('/api/books');
  const books = await response.json();

  bookList.innerHTML = '';
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} by ${book.author}: ${book.description}`;
    bookList.appendChild(li);
  });
};

const addBook = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const author = document.querySelector('#author').value.trim();
  const description = document.querySelector('#description').value.trim();

  if (title && author && description) {
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author, description }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      fetchBooks();
    } else {
      alert('Failed to add book.');
    }
  }
};

addBookForm.addEventListener('submit', addBook);

document.addEventListener('DOMContentLoaded', fetchBooks);