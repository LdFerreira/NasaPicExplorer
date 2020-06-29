import React, { useState, useEffect, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';

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
    const storagedPictures = localStorage.getItem(
      '@NasaExplorer:pictures',
    );

    if (storagedPictures) {
      return JSON.parse(storagedPictures);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@NasaExplorer:pictures',
      JSON.stringify(pictures),
    );
  }, [pictures]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newPicture) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Picture>(`?date=${newPicture}&api_key=WbqqgZf8xsfevHa5gngsYQvy8QAVU8HwejnNWEH7`);

      const picture = response.data;

      setPictures([...pictures, picture]);
      setNewPicture('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositorio');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore imagens da nasa</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <InputMask

          value={newPicture}
          mask="99/99/9999"
          onChange={(e) => setNewPicture(e.target.value)}
          placeholder="Digite uma data dd/mm/aaaa"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {pictures.map((picture) => (
          <Link
            key={picture.date}
            to={`/repositories/${picture.explanation}`}
          >
            <img
              src={picture.url}
              alt={picture.title}
            />
            <div>
              <strong>{picture.title}</strong>
              <p>{picture.explanation}</p>
              <p>{picture.date}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
