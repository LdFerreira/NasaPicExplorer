import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import moment from 'moment';
import { FiChevronLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import {
  Header,
  RepositoryInfo,
  Container,
  Content,
  AnimationContainer,
} from './styles';

interface PictureParams {
  picture: string;
}
interface Picture {
  title: string;
  explanation: string;
  date: string;
  url: string;
}

const Picture: React.FC = () => {
  const [picture, setPicture] = useState<Picture | null>(null);

  const { params } = useRouteMatch<PictureParams>();
  useEffect(() => {
    const storagePictures = localStorage.getItem('@NasaExplorer:pictures');

    if (storagePictures) {
      const localPicture = JSON.parse(storagePictures);

      const findPicture = localPicture.find(
        (pic: Picture) => pic.date === params.picture,
      );
      setPicture(findPicture);
    }

    // api.get(`repos/${params.repository}/issues`).then((response) => {
    //   setIssues(response.data);
    // });
  }, [params]);

  return (
    <>
      <Container>
        <Content>
          <AnimationContainer>
            <Header>
              <img src={logoImg} alt="Github Explorer" />

              <Link to="/">
                <FiChevronLeft size={16} />
                Voltar
              </Link>
            </Header>

            {picture && (
              <RepositoryInfo>
                <header>
                  <a href={picture.url}>
                    <img src={picture.url} alt={picture.title} />
                  </a>
                  <div>
                    <strong>{picture.title}</strong>
                    <p>{picture.explanation}</p>
                  </div>
                </header>
                <ul>
                  <li>
                    <strong>{moment(picture.date).format('DD/MM/YYYY')}</strong>
                  </li>
                </ul>
              </RepositoryInfo>
            )}
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default Picture;
