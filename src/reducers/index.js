import { combineReducers } from 'redux';
import books from './books';
import filter from './filter';
import user from './user';
import reading from './reading';

export default combineReducers({
  books, filter, user, reading,
});
