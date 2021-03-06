import styled from 'styled-components';

export const TeamWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: white;
  width: 20rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const MobileLogoText = styled.h1`
  cursor: pointer;
  z-index: 2;
  margin: 3rem 0 0 -0.5rem;
  color: white;
  font-size: 2.5rem;
  font-family: 'Montserrat';
  font-display: fallback;
  font-weight: bold;
  transition: transform 0.3s ease;
  transform: translateX(0px);

  &:hover {
    transform: translateX(10px);
  }

  @media only screen and (min-width: 870px) {
    margin: 0 0 0 -0.5rem;
  }
`;
