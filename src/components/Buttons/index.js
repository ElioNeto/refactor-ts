import React, { useState } from 'react'

import { IconContext } from "react-icons";
import { MdContentCopy } from 'react-icons/md'
import { FaExternalLinkAlt } from 'react-icons/fa';

import { Modal, Button } from 'react-bootstrap'

export function CopyButton({txt, desc}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true); 
    navigator.clipboard.writeText(txt);
  }
  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        <IconContext.Provider value={{ size: '15px' }}>
          <MdContentCopy/>
        </IconContext.Provider>
         Copiar {desc}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='addMarker'>The Seeker</Modal.Title>
        </Modal.Header>
        <Modal.Body>  
          <small>
            <span className='addMarker'>{txt}</span> copiado com sucesso!
          </small>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function UsdButton({id}){
  const open = () => {
    const url = `http://usd.sicredi.net/CAisd/pdmweb.exe?OP=SEARCH+FACTORY=cr+SKIPLIST=1+QBE.IN.ref_num=${id}`
    window.open(url)
  }
  return (
    <Button variant="outline-primary" onClick={open}>
      <IconContext.Provider value={{ size: '15px' }}>
        <FaExternalLinkAlt/>
      </IconContext.Provider>
      Abrir no USD
    </Button>
  )
}