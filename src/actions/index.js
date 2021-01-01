import {
  REMOVE_BOOK, CREATE_BOOK, UPDATE_BOOK, CHANGE_FILTER, REGISTER_BOOKS,
} from './actionTypes';

export const createBook = book => ({
  type: CREATE_BOOK,
  book,
});

export const removeBook = book => ({
  type: REMOVE_BOOK,
  book,
});

export const updateBook = book => ({
  type: UPDATE_BOOK,
  book,
});

export const registerBooks = books => ({
  type: REGISTER_BOOKS,
  books,
});

export const changeFilter = filter => ({ type: CHANGE_FILTER, filter });
