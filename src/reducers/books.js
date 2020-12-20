import { REMOVE_BOOK, CREATE_BOOK } from '../actions/actionTypes';

const findAndDeleteBook = (books, id) => books.map((book, idx) => {
  if (book.id === id) {
    books.splice(idx, 1);
  }
  return books;
});

export default function books(state = [], action) {
  switch (action.type) {
    case CREATE_BOOK: {
      return [
        ...state,
        action.book,
      ];
    }
    case REMOVE_BOOK: {
      const { book } = action.book;
      const books = [...state];
      return findAndDeleteBook(books, book.id);
    }
    default:
      return state;
  }
}
