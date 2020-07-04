import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Form } from '@unform/web';
import { FiX } from 'react-icons/fi';
import Input from '../Input';
import { Container, ButtonClose, Title, Overlay } from './styles';
import { Picture } from '../../pages/Dashboard';

interface FormData {
  title: string;
  explanation: string;
  date: string;
}

interface TitleProps {
  showModal: boolean;
  editButton: (data: boolean, picture: Picture) => void;
  picture: Picture;
  setPictures: (picture: Array<Picture>) => void;
}

const ModalForm: React.FC<TitleProps> = ({
  showModal,
  editButton,
  picture,
  setPictures,
}) => {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setIsShowing(showModal);
  }, [showModal]);

  function handleButtonClose(): void {
    if (isShowing) {
      setIsShowing(false);
      editButton(false, {
        title: '',
        explanation: '',
        date: '',
        url: '',
      });
    }
  }

  function handleSubmit(data: FormData): void {
    const storagePictures = localStorage.getItem('@NasaExplorer:pictures');

    if (storagePictures) {
      const localPicture = JSON.parse(storagePictures);

      const findPicture = localPicture.findIndex(
        (pic: Picture) => pic.date === picture.date,
      );

      localPicture[findPicture].title = data.title;
      setPictures(localPicture);

      localStorage.setItem(
        '@NasaExplorer:pictures',
        JSON.stringify(localPicture),
      );

      handleButtonClose();
    }
  }

  return (
    <Overlay show={isShowing}>
      <Container show={isShowing}>
        <Title>
          {picture.title}
          <span>{moment(picture.date).format('DD/MM/YYYY')}</span>
        </Title>
        <ButtonClose onClick={handleButtonClose}>
          <FiX size={16} />
        </ButtonClose>
        <Form initialData={picture} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Novo título da imagem" />
          <button type="submit">Editar</button>
        </Form>
      </Container>
    </Overlay>
  );
};

export default ModalForm;
