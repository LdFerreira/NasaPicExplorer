import React, { useState, useEffect, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import { FiChevronRight, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Pictures, Error, List } from './styles';

interface Picture {
  title: string;
  explanation: string;
  date: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const [newPicture, setNewPicture] = useState('');
  const [inputError, setInputError] = useState('');
  const [pictures, setPictures] = useState<Picture[]>(() => {
    const storagePictures = localStorage.getItem('@NasaExplorer:pictures');

    if (storagePictures) {
      return JSON.parse(storagePictures);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('@NasaExplorer:pictures', JSON.stringify(pictures));
  }, [pictures]);

  async function handleAddPicture(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    const newDate = moment(newPicture, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const dateStamp = new Date(newDate).getTime();
    const invalidDate = new Date('1995-06-16').getTime();

    if (!newDate) {
      setInputError('Digite uma data');
      return;
    }

    if (dateStamp < invalidDate) {
      setInputError('As fotos começaram a set tiradas a partir de 16/06/1995');
      return;
    }

    try {
      const response = await api.get<Picture>(
        `?date=${newDate}&api_key=WbqqgZf8xsfevHa5gngsYQvy8QAVU8HwejnNWEH7`,
      );

      const picture = response.data;

      setPictures([picture, ...pictures]);

      setNewPicture('');
      setInputError('');
    } catch (err) {
      setInputError('Data invalida, tente novamente');
    }
  }

  async function handleRemovePicture({ date }: Picture): Promise<void> {
    const findIndex = pictures.findIndex((picture) => picture.date === date);

    pictures.splice(findIndex, 1);
    setPictures([...pictures]);
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore imagens da nasa</Title>

      <Form hasError={!!inputError} onSubmit={handleAddPicture}>
        <InputMask
          value={newPicture}
          mask="99/99/9999"
          onChange={(e) => setNewPicture(e.target.value)}
          placeholder="Digite uma data e descubra a foto que a nasa tirou nesse dia !"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Pictures>
        {pictures.map((picture) => (
          <List key={picture.date}>
            <button type="button" onClick={() => handleRemovePicture(picture)}>
              <FiTrash size={36} />
            </button>
            <Link to={`/pictures/${picture.date}`}>
              <img src={picture.url} alt={picture.title} />
              <div>
                <strong>{picture.title}</strong>
                <p>{picture.explanation}</p>
                <p>{moment(picture.date).format('DD/MM/YYYY')}</p>
              </div>
              <FiChevronRight size={20} />
            </Link>
          </List>
        ))}
      </Pictures>
    </>
  );
};

export default Dashboard;
