import {
  REMOVE_BOOK, CREATE_BOOK, REGISTER_BOOKS, UPDATE_BOOK,
} from '../actions/actionTypes';

const initialState = [];

const findAndDeleteBook = (books, id) => books.filter(book => book.id !== id);

const findAndUpdateBook = (books, book) => {
  const index = books.findIndex(bk => book.id === bk.id);
  return [...books.slice(0, index), book, ...books.slice(index + 1)];
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case REGISTER_BOOKS: {
      return [
        ...state, ...action.books,
      ];
    }
    case CREATE_BOOK: {
      return [
        ...state, action.book,
      ];
    }
    case REMOVE_BOOK: {
      const { id } = action.book;
      return findAndDeleteBook([...state], id);
    }

    case UPDATE_BOOK: {
      const { book } = action;
      return findAndUpdateBook([...state], book);
    }
    default:
      return state;
  }
}
