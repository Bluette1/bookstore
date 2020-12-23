import './App.css';
import React from 'react';
import BooksForm from './containers/BooksForm';
import BooksList from './containers/BooksList';
import logo from './logo.svg';

export default function App() {
  return (
    <div className="content">
      <div className="header">
        <ul className="bookstore-heading">
          <li>
            <img src={logo} className="app-logo" alt="logo" />
            Bookstoria
          </li>
          <li>BOOKS</li>
          <li>CATEGORIES</li>
        </ul>
        <i className="fas fa-user-circle fa-3x" aria-hidden="true" />
      </div>
      <div>
        <BooksList />
        <BooksForm />
      </div>
    </div>
  );
}
