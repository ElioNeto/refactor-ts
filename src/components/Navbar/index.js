import React from 'react';

import { Navbar, Nav, Badge, NavDropdown } from 'react-bootstrap'

import { IconContext } from "react-icons"
import { TiCogOutline } from 'react-icons/ti'
import { FaHome } from 'react-icons/fa'
import { MdPlaylistAdd } from 'react-icons/md'

export default function MainNavbar({ version }){

  return(
    <>
      <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
        <Navbar.Brand href="/">
          The Seeker
          <small>
            <br/>
            <center>
              <Badge pill variant="light">{version}</Badge>
            </center>
          </small>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">
              <IconContext.Provider value={{ size: '20px' }}>
                <center>
                  <FaHome/>
                  <br/>
                  <small>
                    Home
                  </small>
                </center>
              </IconContext.Provider>
            </Nav.Link>
            <Nav.Link href="/adicionar">
              <IconContext.Provider 
              value={{ size: '20px'}}>
                <center><MdPlaylistAdd/><br/><small>Cadastrar</small></center>
              </IconContext.Provider>
            </Nav.Link>
            <Nav.Link href='/editMessage'>
              <IconContext.Provider value={{ size: '25px' }}>
                <center>
                  <TiCogOutline/>
                  <br/>
                  <small>Configurações</small>
                </center>
              </IconContext.Provider>
            </Nav.Link>
          </Nav>
          <Nav inline>
            <Nav.Link href="/analises">Análises</Nav.Link>
            <NavDropdown title="Payloads" id="nav-dropdown">
              <NavDropdown.Item href="/recarga">Payload Recarga</NavDropdown.Item>
              <NavDropdown.Item href="/limitesService">LimitesCreditoService</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <Nav.Link href="/RDM">RDM</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}