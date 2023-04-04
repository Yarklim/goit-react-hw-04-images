import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { getSearchedImagesApi } from '../../services/imagesApi';
import Button from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Gallery } from './ImageGallery.styled';
import { LoaderWrapper } from 'components/Loader/Loader.styled';

function ImageGallery(props) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImg, setLargeImg] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  const imagesItemRef = useRef(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setQuery(props.query);
  }, [props.query]);

  useEffect(() => {
    if (query) {
      async function setImagesFromApi() {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getSearchedImagesApi(query, page);
          if (data.hits.length === 0) {
            setPage(1);
            window.scrollTo(0, 0);
            throw new Error(`No images for ${query}`);
          }
          setImages(prevImages =>
            page === 1 ? data.hits : [...prevImages, ...data.hits]
          );
          setTotalHits(data.totalHits);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      setImagesFromApi();
    }
  }, [query, page]);

  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
  };

  const showLargeImg = largeImg => {
    setLargeImg(largeImg);
  };

  useEffect(() => {
    imagesItemRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [images]);

  if (!query) {
    return null;
  }

  return (
    <>
      {error ? (
        <h2
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: '32px',
            color: 'white',
          }}
        >
          {error}
        </h2>
      ) : (
        <>
          <Gallery>
            <ImageGalleryItem
              images={images}
              imagesItemRef={imagesItemRef}
              showLargeImg={showLargeImg}
              showModal={toggleModal}
            />
            {isModalOpen && (
              <Modal closeModal={toggleModal} largeImg={largeImg}></Modal>
            )}
          </Gallery>
          {isLoading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          {images.length > 0 && images.length < totalHits ? (
            <Button onClick={changePage} />
          ) : null}
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  props: PropTypes.string,
};

export default ImageGallery;
