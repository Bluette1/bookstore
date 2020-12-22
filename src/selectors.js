import { FILTERS } from './constants';

const getBooksByFilter = (store, filter) => {
  const allBooks = store.books;
  switch (filter) {
    case FILTERS.ACTION:
      return allBooks.filter(book => book.category === FILTERS.ACTION);
    case FILTERS.BIOGRAPHY:
      return allBooks.filter(book => book.category === FILTERS.BIOGRAPHY);
    case FILTERS.HISTORY:
      return allBooks.filter(book => book.category === FILTERS.HISTORY);
    case FILTERS.HORROR:
      return allBooks.filter(book => book.category === FILTERS.HORROR);
    case FILTERS.KIDS:
      return allBooks.filter(book => book.category === FILTERS.KIDS);
    case FILTERS.LEARNING:
      return allBooks.filter(book => book.category === FILTERS.LEARNING);
    case FILTERS.SCI_FI:
      return allBooks.filter(book => book.category === FILTERS.SCI_FI);
    case FILTERS.ALL:
    default:
      return allBooks;
  }
};

export default getBooksByFilter;
