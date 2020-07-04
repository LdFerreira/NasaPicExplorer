import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;
const apperFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px)
  }
  to {
    opacity: 1;
    transform: translateX(0)
  }
`;
export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;

  animation: ${apperFromRight} 1s;
`;
export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }
    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: block;
    align-items: center;
    justify-content: center;
    flex: 1;
    img {
      width: 100%;
      height: 500px;
      border-radius: 20px;
      margin-left: 24px;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;
    margin-left: 24px;
    li {
      & + li {
        margin-left: 80px;
      }
      display: block;
      font-size: 36px;
      color: #3d3d4d;
    }

    span {
      display: block;
      margin-top: 4px;
      color: #6c6c80;
    }
  }
`;

// export const Issues = styled.div`
//   margin-top: 80px;

//   a {
//     background: #fff;
//     border-radius: 5px;
//     width: 100%;
//     padding: 24px;
//     display: block;
//     text-decoration: none;

//     display: flex;
//     align-items: center;
//     text-decoration: none;
//     transition: transform 0.2s;
//     & + a {
//       margin-top: 16px;
//     }
//     &:hover {
//       transform: translateX(10px);
//     }

//     div {
//       margin: 0 16px;
//       flex: 1;
//       strong {
//         font-size: 20px;
//         color: #3d3d4d;
//       }

//       p {
//         font-size: 18px;
//         color: #a8a8b3;
//         margin-top: 4px;
//       }
//     }

//     svg {
//       margin-left: auto;
//       color: #cbcbd6;
//     }
//   }
// `;
