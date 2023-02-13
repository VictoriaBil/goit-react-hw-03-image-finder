import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { fetchPictures } from '../API/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export default class App extends Component {
  state = {
    pictures: [],
    status: 'idle',
    showModal: false,
    largeImageUrl: '',
    page: 1,
    query: '',
    loadMore: null,
  };

  getLargeImgUrl = imgUrl => {
    this.setState({ largeImageUrl: imgUrl });
    this.toggleModal();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  searchResult = value => {
    this.setState({ query: value, page: 1, pictures: [], loadMore: null });
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ status: 'loading' });

      fetchPictures(query, page)
        .then(e =>
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...e.hits],
            status: 'idle',
            loadMore: 12 - e.hits.length,
          }))
        )
        .catch(error => console.log(error));
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.searchResult} />
        {this.state.showModal && (
          <Modal imgUrl={this.state.largeImageUrl} onClose={this.toggleModal} />
        )}
        <ImageGallery
          pictures={this.state.pictures}
          onClick={this.getLargeImgUrl}
        />
        {this.state.status === 'loading' && <Loader />}
        {this.state.loadMore === 0 && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}
