import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ pictures, onClickImg }) => {
  return pictures.map(picture => {
    return (
      <div className={css.imageGalleryItem} key={picture.id}>
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
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ),
  onClickImg: PropTypes.func.isRequired,
};
