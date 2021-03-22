import React, { useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';

export default function K8s_BuscarPorDocumento(){

  const [document, setDocument] = useState()
  const [coop, setCoop] = useState()

  const link = `http://k8s.sicredi.net/sicredi-credito-limites-disponiveis-canais-api/limitesDisponiveisCanais/buscarPorDocumento?numCooperativa=${coop}&numDocumento=${document}&tpoCanal=MOBI`

  function redirect(){
    window.open(link, "_blank")
  }

  return(
    <Accordion>
      <Card>
        <center>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="outline-success" eventKey="0">
              K8S - Buscar por Documento (Gestão de Limites)
            </Accordion.Toggle>
          </Card.Header>
        </center>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Form onSubmit={redirect}>
              <Form.Group>
                <Form.Label className="addMarker">Cooperativa</Form.Label>
                <Form.Control
                  className='borderInput'
                  type='number'
                  placeholder='Informe o número da Cooperativa'
                  name="coop"
                  value={coop}
                  onChange={ e => {setCoop(e.target.value)} }
                />
                <Form.Text className="text-muted">Ex.: 0119</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label className="addMarker">Documento</Form.Label>
                <Form.Control
                  className='borderInput'
                  type='number'
                  placeholder='Informe o CPF ou CNPJ'
                  name="coop"
                  value={document}
                  onChange={ e => {setDocument(e.target.value)} }
                />
                <Form.Text className="text-muted">Ex.: 20094509746</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Text className="text-muted text-muted-green">
                  {document && coop !== undefined && link }
                </Form.Text>
              </Form.Group>
              <Button type='submit' variant='success'>Acessar</Button>
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}