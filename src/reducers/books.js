import { REMOVE_BOOK, CREATE_BOOK } from '../actions/actionTypes';

const initialState = [];

const findAndDeleteBook = (books, id) => books.filter(book => book.id !== id);

export default function books(state = initialState, action) {
  switch (action.type) {
    case CREATE_BOOK: {
      return [
        ...state, action.book,
      ];
    }
    case REMOVE_BOOK: {
      const { id } = action.book;
      return findAndDeleteBook([...state], id);
    }
    default:
      return state;
  }
}
