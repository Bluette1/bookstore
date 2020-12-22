import './App.css';
import React from 'react';
import BooksForm from './containers/BooksForm';
import BooksList from './containers/BooksList';

export default function App() {
  return (
    <div>
      <h1 className="bookstore-heading">Bookstoria</h1>
      <BooksList />
      <BooksForm />
    </div>
  );
}
