import React, { useState, useEffect, FormEvent } from 'react';
import InputMask from 'react-input-mask';
import { FiChevronRight, FiTrash, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import ModalForm from '../../components/ModalForm';

import {
  Title,
  Form,
  Container,
  Content,
  Error,
  List,
  AnimationContainer,
  Actions,
} from './styles';

export interface Picture {
  title: string;
  explanation: string;
  date: string;
  url: string;
}

const Dashboard: React.FC = () => {
  const [newPicture, setNewPicture] = useState('');
  const [inputError, setInputError] = useState('');
  const [showingModalEdit, setShowingModalEdit] = useState(false);
  const [dataPicture, setDataPicture] = useState({
    title: '',
    explanation: '',
    date: '',
    url: '',
  });
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

  function handleEditPicture(data: boolean, picture: Picture): void {
    setShowingModalEdit(data);
    setDataPicture(picture);
  }

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
      setInputError('As fotos começaram a ser tiradas a partir de 16/06/1995');
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
      setInputError('Data inválida, tente novamente');
    }
  }

  async function handleRemovePicture({ date }: Picture): Promise<void> {
    const findIndex = pictures.findIndex((picture) => picture.date === date);

    pictures.splice(findIndex, 1);
    setPictures([...pictures]);
  }

  return (
    <>
      {showingModalEdit && (
        <ModalForm
          showModal={showingModalEdit}
          editButton={(data: boolean, picture: Picture) =>
            handleEditPicture(data, picture)
          }
          picture={dataPicture}
          setPictures={(picture: Array<Picture>) => setPictures(picture)}
        />
      )}

      <Container>
        <Content>
          <AnimationContainer>
            <img src={logoImg} alt="Github Explorer" />
            <Title>Explore imagens da NASA</Title>

            <Form hasError={!!inputError} onSubmit={handleAddPicture}>
              <InputMask
                value={newPicture}
                mask="99/99/9999"
                onChange={(e) => setNewPicture(e.target.value)}
                placeholder="Digite uma data e descubra a foto que a NASA tirou nesse dia!"
              />
              <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            {pictures.map((picture) => (
              <List key={picture.date}>
                <Link to={`/pictures/${picture.date}`}>
                  <img src={picture.url} alt={picture.title} />
                  <div>
                    <strong>{picture.title}</strong>
                    <p>{picture.explanation}</p>
                    <p className="date">
                      {moment(picture.date).format('DD/MM/YYYY')}
                    </p>
                  </div>
                  <FiChevronRight size={20} />
                </Link>
                <Actions>
                  <button
                    type="button"
                    onClick={() => handleRemovePicture(picture)}
                  >
                    <FiTrash size={22} />
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEditPicture(true, picture)}
                  >
                    <FiEdit2 size={22} />
                  </button>
                </Actions>
              </List>
            ))}
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Dashboard;
