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
    showModal: false,
    largeImageUrl: '',
    page: 1,
    query: '',
    error: '',
    isLoading: false,
    total: 0,
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
      this.setState({ query: value, page: 1, pictures: [] });
    }
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, total } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({
          isLoading: true,
        });

        await fetchPictures(query, page, total).then(data => {
          if (data.hits.length) {
            this.setState(({ pictures }) => ({
              pictures: [...pictures, ...data.hits],
              total: data.totalHits,
              isLoading: false,
            }));
          } else {
            alert(
              "Sorry we can't find anyting for your request. Please enter another request"
            );
          }
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  render() {
    const { pictures, showModal, isLoading, total, largeImageUrl, error } =
      this.state;
    const totalPage = pictures.length / total;

    return (
      <div className={css.Container}>
        <div className={css.App}>
          <Searchbar onSubmit={this.searchResult} />
          {error && <p>Something went wrong. Please refresh the page</p>}
          {isLoading && <Loader />}
          {showModal && (
            <Modal imgUrl={largeImageUrl} onClose={this.toggleModal} />
          )}
          <ImageGallery pictures={pictures} onClick={this.getLargeImgUrl} />
          {totalPage < 1 && <Button onClick={this.handleLoadMore} />}
        </div>
      </div>
    );
  }
}
