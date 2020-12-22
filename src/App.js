import './App.css';
import React from 'react';
import BooksForm from './containers/BooksForm';
import BooksList from './containers/BooksList';
import logo from './logo.png';

export default function App() {
  return (
    <div>
      <ul className="bookstore-heading">
        <li>
          <img src={logo} className="app-logo" alt="logo" />
          Bookstoria
        </li>
        <li>BOOKS</li>
        <li>CATEGORIES</li>
      </ul>
      <BooksList />
      <BooksForm />
    </div>
  );
}
