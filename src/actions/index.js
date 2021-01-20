import {
  REMOVE_BOOK,
  CREATE_BOOK,
  UPDATE_BOOK,
  CHANGE_FILTER, REGISTER_BOOKS, REGISTER_READING,
  LOGIN, LOGOUT, UPDATE_READING, REMOVE_FROM_READING, ADD_TO_READING,
} from './actionTypes';

export const createBook = book => ({
  type: CREATE_BOOK,
  book,
});

export const addToReading = book => ({
  type: ADD_TO_READING,
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

export const updateReading = book => ({
  type: UPDATE_READING,
  book,
});

export const removeReading = book => ({
  type: REMOVE_FROM_READING,
  book,
});

export const registerBooks = books => ({
  type: REGISTER_BOOKS,
  books,
});

export const registerReading = reading => ({
  type: REGISTER_READING,
  reading,
});

export const login = user => ({
  type: LOGIN,
  user,
});

export const logout = () => ({
  type: LOGOUT,
  user: {},
});

export const changeFilter = filter => ({ type: CHANGE_FILTER, filter });
