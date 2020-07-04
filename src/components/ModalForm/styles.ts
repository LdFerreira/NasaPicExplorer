import styled from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}
interface Props {
  show: boolean;
}

export const Container = styled.div<Props>`
  z-index: 999;
  display: ${(props: Props) => (props.show ? 'flex' : 'none')};
  width: 40%;
  height: 350px;
  background-color: #f7f7f7;
  box-shadow: 0px 14px 39px 14px rgba(0, 0, 0, 0.08);
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  form {
    width: 80%;
    input {
      width: 100%;
      border: none;
      padding: 12px;
      margin-bottom: 6px;
      border-radius: 5px;
    }
    button {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      color: #fff;
      font-weight: bold;
      flex: 1;
      background: #0066b3;
      border-radius: 5px;
      padding: 12px;
      text-decoration: none;
      border: 0;
      display: flex;
      align-items: center;
      transition: transform 0.2s;
      width: 100%;
      transition: background-color 0.2s;
      &:hover {
        background: ${shade(0.2, '#0066b3')};
      }

      svg {
        color: #fff;
      }
    }
  }
`;

export const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;
  background: none;
  border: none;
  width: fit-content;

  svg {
    color: #818181;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.8, '#0066b3')};
    }
  }
`;

export const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  color: #676767;
  font-size: 24px;
  text-align: center;
  span {
    font-weight: 300;
    font-size: 11px;
  }
`;

export const Overlay = styled.div<Props>`
  display: ${(props: Props) => (props.show ? 'flex' : 'none')};
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
`;
