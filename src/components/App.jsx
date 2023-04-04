import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');

  const changeQuery = query => {
    if (query.trim() === '') {
      toast.info('Enter search value!');
      return;
    }
    setQuery(query);
  };

  return (
    <Container>
      <Searchbar onSubmit={changeQuery} />
      <ImageGallery query={query} />
      <ToastContainer autoClose={3500} />
    </Container>
  );
};
