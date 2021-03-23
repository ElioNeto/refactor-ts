import React from 'react';
import { Alert, Button } from 'react-bootstrap';

import * as H from '../../utils/config/header'

export default function Header({ status, message, pf, pj, bo }){

  return(
    <Alert variant='success' className='m-4 ml-5 mr-5'>
      {H.TITLE && <Alert.Heading> {status} </Alert.Heading>}
      {H.SUBTITLE && <p className='mb-5'> {message} </p>}
      {H.BTN01 && <><Button variant="outline-success" href={pj} target="_blank">IBPJ</Button>&nbsp;</> }
      {H.BTN02 && <><Button variant="outline-success" href={pf} target="_blank">IBPF</Button>&nbsp;</>}
      {H.BTN03 && <><Button variant="outline-success" href={bo} target="_blank">BO</Button></>}
    </Alert>
  )
}