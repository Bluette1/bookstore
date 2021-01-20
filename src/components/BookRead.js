import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { removeReading, updateReading } from '../actions/index';
import { httpProtocol, host, port } from '../envVariables';

class Book extends React.Component {
  constructor(props) {
    super(props);
    const { props: { reading } } = this;
    const { book, pagesRead, currentChapter } = reading;
    this.state = {
      showProgressForm: false, ...book, pagesRead, currentChapter,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleRemoveReading() {
    const { props: { reading } } = this;
    axios.delete(`${httpProtocol}://${host}:${port}/readings/${reading.id}}`)
      .then(() => {
        const { props: { reading, removeReading } } = this;
        removeReading(reading.book);
      });
  }

  handleUpdateReading() {
    const { props: { reading } } = this;
    const {
      pagesRead, currentChapter,
    } = this.state;
    axios.put(`${httpProtocol}://${host}:${port}/readings/${reading.id}`, {
      pagesRead, currentChapter,
    })
      .then(response => {
        const { props: { updateReading } } = this;
        updateReading(response.data);
      });
  }

  showUpdateProgressForm() {
    this.setState({ showProgressForm: true });
  }

  hideUpdateProgressForm() {
    this.setState({ showProgressForm: false });
    this.handleUpdateReading();
  }

  render() {
    const {
      pagesRead,
      totalPages,
      showProgressForm, currentChapter,
      title, category, author,
    } = this.state;
    const value = (pagesRead / totalPages).toFixed(2);

    return (
      <div className="book-row">
        <div className="title-category">
          <p className="category">{category}</p>
          <h4 className="title">{title}</h4>
          <p className="author">{author}</p>
          <ul className="comments-section">
            <li>Comments</li>
            <li aria-hidden="true" role="presentation" onClick={() => this.handleRemoveReading()}>Remove</li>
          </ul>
        </div>
        <div className="progress">
          <div className="progressBar">
            <CircularProgressbar className="progressBar" value={value} maxValue={1} />
          </div>
          <div>
            <h4 className="percent">
              {`${Math.round(value * 100)}%`}
            </h4>
            <p className="completed">Completed</p>
          </div>
        </div>
        <div>
          <h4 className="current-chapter">CURRENT CHAPTER</h4>
          <p className="current-lesson">{currentChapter}</p>
          <button type="button" className="update-progress-btn" onClick={() => this.showUpdateProgressForm()}>
            <span className="update-progress">UPDATE PROGRESS</span>
          </button>
          {showProgressForm ? (
            <div className="form-div">
              <div className="popup-form">
                <form id="form">
                  <i className="fa fa-times-circle-o fa-lg" aria-hidden="true" onClick={() => this.hideUpdateProgressForm()} />
                  <h2>Update Reading Progress</h2>
                  <p htmlFor="book-title" className="book-title">
                    {title}
                    <br />
                  </p>
                  <label htmlFor="pages-read">
                    Pages read:
                    <input id="pages-read" name="pages-read" placeholder={pagesRead} type="number" onChange={e => this.handleChangePagesRead(e.target.value)} />
                  </label>
                  <label htmlFor="total-pages">
                    Total pages:
                    <input id="total-pages" name="total-pages" placeholder={totalPages} type="number" onChange={e => this.handleChangeTotalPages(e.target.value)} />
                  </label>
                  <label htmlFor="current-chapter">
                    Current chapter:
                    <input id="current-chapter" name="current-chapter" placeholder={currentChapter} type="text" onChange={e => this.handleChangeCurrentChapter(e.target.value)} />
                  </label>
                  <button type="submit" onClick={() => this.hideUpdateProgressForm()}>OK</button>
                </form>
              </div>
            </div>
          ) : null }
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  reading: PropTypes.objectOf(PropTypes.any).isRequired,
  removeReading: PropTypes.func.isRequired,
  updateReading: PropTypes.func.isRequired,
};

export default connect(null, { removeReading, updateReading })(Book);
