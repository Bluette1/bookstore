import { combineReducers } from 'redux';
import books from './books';
import filter from './filter';
import authentication from './authentication';
import reading from './reading';

export default combineReducers({
  books, filter, authentication, reading,
});
