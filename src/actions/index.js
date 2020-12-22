import { REMOVE_BOOK, CREATE_BOOK, CHANGE_FILTER } from './actionTypes';

function getRandomIntInclusive(lower, upper) {
  const min = Math.ceil(lower);
  const max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const createBook = (title, category) => ({
  type: CREATE_BOOK,
  book: {
    id: `${getRandomIntInclusive(1, 100)}`,
    title,
    category,
  },
});

export const removeBook = book => ({
  type: REMOVE_BOOK,
  book,
});

export const changeFilter = filter => ({ type: CHANGE_FILTER, filter });
