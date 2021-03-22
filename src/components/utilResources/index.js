import React from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { GoPlus } from 'react-icons/go'
import K8sBuscarPorDocumento from './k8s-bucarPorDocumento';

export default function Utils(){

  return(
    <Accordion className='mb-4 ml-3 mr-3'>
      <Card>
        <center>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='outline-success' eventKey="0">
              <IconContext.Provider value={{ size:'30px' }}>
                <GoPlus/> &nbsp;Utilitários
              </IconContext.Provider>
            </Accordion.Toggle>
          </Card.Header>
        </center>
        <Accordion.Collapse eventKey="0">
          <K8sBuscarPorDocumento/>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}