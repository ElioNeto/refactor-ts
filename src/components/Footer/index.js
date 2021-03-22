import React from 'react';
import { Button, Col, Navbar, Row } from 'react-bootstrap';
import { FaGithubAlt } from 'react-icons/fa';

export default function Footer(){

  return(
    <Navbar bg='success' variant='dark' sticky='bottom' className='footer text-center flex'>
      <Navbar.Brand href="#home">
        <Row>
          <Col className='flex-item-1 footer-item'><Button variant="outline-light" href='https://github.com/ElioNeto/refactor-ts' ><FaGithubAlt/></Button></Col>
          <Col className='flex-item-1 footer-item'><b>Desenvolvido por: </b>Elio Neto</Col>
          <Col className='flex-item-1 footer-item' ><small>2021</small></Col>
        </Row>
      </Navbar.Brand>
    </Navbar>
  )
}