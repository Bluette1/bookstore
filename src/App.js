import './App.css';
import React from 'react';
import BooksForm from './containers/BooksForm';
import BooksList from './containers/BooksList';

export default function App() {
  return (
    <div className="bookstore-app">
      <h1>Bookstoria</h1>
      <BooksList />
      <BooksForm />
    </div>
  );
}
