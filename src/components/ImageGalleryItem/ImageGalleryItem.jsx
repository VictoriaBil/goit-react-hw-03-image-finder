import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ pictures, onClickImg }) => {
  return pictures.map((picture, index) => {
    return (
      <div className={css.imageGalleryItem} key={index}>
        <img
          onClick={() => {
            onClickImg(picture.largeImageURL);
          }}
          src={picture.webformatURL}
          alt={picture.tags}
          className={css.imageGalleryItemImage}
        />
      </div>
    );
  });
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
  onClickImg: PropTypes.func.isRequired,
};