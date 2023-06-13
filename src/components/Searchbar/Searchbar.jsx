import { useState } from 'react';
import PropTypes from 'prop-types';
import { Header, Form, BtnSubmit, BtnText, Input } from './Searchbar.styled';
import Icon from '../../images/glass.png';

const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <BtnSubmit type="submit">
          <img src={Icon} alt="search" />
          <BtnText>Search</BtnText>
        </BtnSubmit>

        <Input
          type="text"
          value={input}
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  input: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
