import React from 'react';
import { Alert, Button } from 'react-bootstrap';

export default function Header({ status, message, pf, pj, bo }){

  return(
    <Alert variant='success' className='m-4 ml-5 mr-5'>
      <Alert.Heading> {status} </Alert.Heading>
      <p className='mb-5'> {message} </p>
      <Button variant="outline-success" href={pj} target="_blank">IBPJ</Button>&nbsp; 
      <Button variant="outline-success" href={pf} target="_blank">IBPF</Button>&nbsp;
      <Button variant="outline-success" href={bo} target="_blank">BO</Button>
    </Alert>
  )
}