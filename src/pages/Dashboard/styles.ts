import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}
export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  button {
    flex: 1;
    background: #ed1c24;
    border-radius: 0 5px 0 0;
    padding: 24px;
    text-decoration: none;
    border: 0;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ED1C24')};
    }

    svg {
      color: #fff;
    }
  }
  button.edit {
    flex: 1;
    background: #0066b3;
    border-radius: 0 0 5px 0;
    padding: 24px;
    text-decoration: none;
    border: 0;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#0066b3')};
    }

    svg {
      color: #fff;
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;
const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  animation: ${apperFromLeft} 1s;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<FormProps>`
  display: flex;
  margin-top: 24px;
  margin-bottom: 36px;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border-radius: 5px 0 0 5px;
    color: #a3a3a3;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 70px;
    background: #0066b3;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#0066B3')};
    }
  }
`;
export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const List = styled.div`
  display: flex;
  margin-top: 16px;
  position: relative;
  &:hover {
    transform: translateX(15px);
  }
  a {
    background: #fff;
    width: 100%;
    padding: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 20px;
    }

    img {
      position: absolute;
      width: 20%;
      height: 100%;
      left: 0;
      border-radius: 5px 0 0 5px;
    }

    div {
      margin: 0 16px 0 23%;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      > p {
        font-size: 12px;
        color: #a8a8b3;
        margin-top: 5px;
        max-width: 300ch;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .date {
        margin-top: 10px;
        font-weight: 600;
        color: #909090;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;
