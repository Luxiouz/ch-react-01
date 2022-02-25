import styled, {keyframes} from "styled-components";

const pulse = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.025);
  }
`;

const LogoCompany = styled.div`
  font-weight: bold;
  animation: ${pulse} 1s linear infinite alternate;
`

const LogoCompanyTitle = styled.h2`
  font-size: 48px;
  color: #0b4f6c;
  filter: drop-shadow(0 0 0.07rem #01baef);
`

const LogoCompanySubTitle = styled.h3`
  font-size: 32px;
  color: #01baef;
  filter: drop-shadow(0 0 0.1rem lightblue);
`

const Modal = styled.div`
  background-color: rgba(255,255,255, 0.92);
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  position: fixed;
`

export {LogoCompany, LogoCompanyTitle, LogoCompanySubTitle, Modal}
