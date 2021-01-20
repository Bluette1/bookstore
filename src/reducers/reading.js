import _ from 'lodash';
import {
  REMOVE_FROM_READING, ADD_TO_READING, UPDATE_READING, REGISTER_READING,
} from '../actions/actionTypes';

const initialState = [];

const findAndDeleteBook = (books, id) => books.filter(book => book.id !== id);

const findAndUpdateBook = (books, book) => {
  const index = books.findIndex(bk => book.id === bk.id);
  return [...books.slice(0, index), book, ...books.slice(index + 1)];
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case REGISTER_READING: {
      return [
        ..._.cloneDeep(state), ...action.reading,
      ];
    }
    case ADD_TO_READING: {
      return [
        ..._.cloneDeep(state), action.book,
      ];
    }
    case REMOVE_FROM_READING: {
      const { id } = action.book;
      return findAndDeleteBook([..._.cloneDeep(state)], id);
    }

    case UPDATE_READING: {
      const { book } = action;
      return findAndUpdateBook([..._.cloneDeep(state)], book);
    }
    default:
      return state;
  }
}
