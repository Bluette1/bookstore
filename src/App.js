import './App.css';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BooksForm from './containers/BooksForm';
import BooksList from './containers/BooksList';
import ReadingList from './containers/ReadingList';
import Login from './components/Login';
import logo from './logo.svg';
import CategoryFilter from './components/CategoryFilter';

const App = ({ authentication }) => {
  const [renderReading, setRenderReading] = useState(false);
  const showReading = () => {
    setRenderReading(true);
  };
  const handleSetReading = () => {
    showReading();
  };
  const list = renderReading ? <ReadingList /> : (
    <div>
      <BooksList showReading={showReading} />
      <BooksForm />
    </div>
  );
  return (
    <div className="content">
      <div className="header">
        <ul className="bookstore-heading">
          <li>
            <img src={logo} className="app-logo" alt="logo" />
            Bookstoria
          </li>
          <li><button type="submit" onClick={handleSetReading}>CURRENTLY READING</button></li>
          <CategoryFilter />
        </ul>
        <i className="fas fa-user-circle fa-3x" aria-hidden="true" />
      </div>
      {authentication
        ? list
        : <Login /> }
    </div>
  );
};
App.propTypes = {
  authentication: PropTypes.objectOf(PropTypes.any),
};

App.defaultProps = {
  authentication: {},
};

export default connect(state => ({ authentication: state.authentication }))(App);
