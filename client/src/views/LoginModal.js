import React from "react";
import styled from 'styled-components';
import { Modal } from "reactstrap";

const ModalContainer = styled.div`
  // background: #f8f9fa;
  // margin: auto;
  // position: absolute;
  // width: 40%;
  // padding: 20px;
  // border-radius: .25rem;
  // left: 30%;
  // top: 25%;
`;

const LoginModal = ({show, children}) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none"

  return (
    <Modal className={showHideClassName}>
      <ModalContainer>
        {children}
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;