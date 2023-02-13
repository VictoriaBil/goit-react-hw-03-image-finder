import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  searchResult = event => {
    this.setState({
      search: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { search } = this.state;

    this.props.onSubmit(search);
    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.searchResult}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
