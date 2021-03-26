import { observer } from "mobx-react-lite";
import React from "react";
import { Modal } from "react-bootstrap";
import { useStore } from "../../Store/store";

 function ModalContainer() {
  const { modalStore } = useStore();

  const {  hide, body,active } = modalStore;

  return (
    <Modal show={active} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice App</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
}


export default observer(ModalContainer);