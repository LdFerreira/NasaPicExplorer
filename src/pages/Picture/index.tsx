import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import moment from 'moment';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo } from './styles';

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
  // const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<PictureParams>();
  useEffect(() => {
    api
      .get(
        `?date=${params.picture}&api_key=WbqqgZf8xsfevHa5gngsYQvy8QAVU8HwejnNWEH7`,
      )
      .then((response) => {
        setPicture(response.data);
      });

    // api.get(`repos/${params.repository}/issues`).then((response) => {
    //   setIssues(response.data);
    // });
  }, [params.picture]);

  return (
    <>
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
    </>
  );
};

export default Picture;
