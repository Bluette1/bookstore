import { REMOVE_BOOK, CREATE_BOOK } from '../actions/actionTypes';

const initialState = {
  books: [],
};

const findAndDeleteBook = (books, id) => books.filter(book => book.id !== id);

export default function books(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOK: {
      return {
        ...state,
        books: [...state.books, action.book],
      };
    }
    case REMOVE_BOOK: {
      const { id } = action.book;
      return {
        ...state,
        books: findAndDeleteBook([...state.books], id),
      };
    }
    default:
      return state;
  }
}
