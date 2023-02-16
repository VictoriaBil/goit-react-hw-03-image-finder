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
    per_page: 12,
    query: '',
    loadMore: 0,
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
    if (value === '') {
      alert('Please write something');
      return;
    } else {
      this.setState({ query: value, page: 1, pictures: [], loadMore: null });
    }
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, per_page, loadMore } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const data = await fetchPictures(query, page, per_page);
        this.setState(({ pictures }) => ({
          pictures: [...pictures, ...data.hits],
          status: 'resolved',
          loadMore: Math.ceil(data.totalHits / per_page),
        }));
      } catch (error) {
        alert('Sorry, try again');
        this.setState({
          status: 'rejected',
        });
      }
      if (loadMore === page) {
        alert(`We're sorry, but you've reached the end of search`);
        this.setState({
          status: 'idle',
        });
      }
    }
  }

  render() {
    return (
      <div className={css.Container}>
        <div className={css.App}>
          <Searchbar onSubmit={this.searchResult} />
          {this.state.showModal && (
            <Modal
              imgUrl={this.state.largeImageUrl}
              onClose={this.toggleModal}
            />
          )}
          <ImageGallery
            pictures={this.state.pictures}
            onClick={this.getLargeImgUrl}
          />
          {this.state.status === 'pending' && <Loader />}
          {this.state.status === 'resolved' && this.state.loadMore > 1 && (
            <Button onClick={this.handleLoadMore} />
          )}
        </div>
      </div>
    );
  }
}
