import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';

import firebase from '../../utils/api/firebase'
import Header from '../../components/Header';
import Utils from '../../components/utilResources';
import { S0, S1, S2, TH0, TH1, TH2, TH3, TH4 } from '../../utils/constants';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { CopyButton, UsdButton } from '../../components/Buttons';
import Footer from '../../components/Footer';

export default function Home(){

  const [data, setData] = useState([])
  const [version, setVersion] = useState(null)
  const [ip, setIp] = useState(null)
  const [status, setStatus] = useState('Bem vindo ao TheSeeker')
  const [message, setMessage] = useState('Aguarde...')
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState(null)

  const port = ':7010'
  const pf = 'preauth.thml'
  const pj = '/ib-view/'
  const bo = '/bo-view'
  const protocol = 'http://'

  const IBPF = protocol + ip + port + pj + pf
  const IBPJ = protocol + ip + port + pj
  const BO = protocol + ip + port + bo

  function getVersion() {
    setIsLoading(true)
    firebase
    .database()
    .ref('versao')
    .on('value', snapshot => {
      setVersion(snapshot.val())
      setIsLoading(false)
    })
  }

  function getStatus(){
    setIsLoading(true)
    firebase
    .database()
    .ref('statusView')
    .on('value', snapshot => {
      setStatus(snapshot.val())
      setIsLoading(false)
    })
  }

  function getMessage(){
    setIsLoading(true)
    firebase
    .database()
    .ref('msgView')
    .on('value', snapshot => {
      setMessage(snapshot.val())
      setIsLoading(false)
    })
  }

  function getIp(){
    setIsLoading(true)
    firebase
    .database()
    .ref('MyIpServer')
    .on('value', snapshot => {
      setIp(snapshot.val())
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getVersion()
    getMessage()
    getStatus()
    getIp()
  })

  async function getIncidents() {
    let aux = []
    await firebase.firestore()
      .collection(S0)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(document => {
          aux.push({
            origem: document.data().origem,
            descricao: document.data().descricao,
            contorno: document.data().contorno,
            id: document.id
          })
        })
        setData(aux)
        setType(S0)
      })
    .catch(error => console.log(`Error getting documents: ${error}`))
  }

  async function getProblems() {
    let aux = []
    await firebase.firestore()
      .collection(S1)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(document => {
          aux.push({
            origem: document.data().origem,
            descricao: document.data().descricao,
            contorno: document.data().contorno,
            id: document.id
          })
        })
        setData(aux)
        setType(S1)
      })
    .catch(error => console.log(`Error getting documents: ${error}`))
  }

  async function getSchedules() {
    let aux = []
    await firebase.firestore()
      .collection('Agendador')
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(document => {
          aux.push({
            origem: document.data().origem,
            descricao: document.data().descricao,
            id: document.id
          })
        })
        setData(aux)
        setType(S2)
      })
    .catch(error => console.log(`Error getting documents: ${error}`))
  }

  function filterColumn(index){
    let input = document.getElementById("filter-"+index)
    let filter = input.value.toUpperCase()
    let table = document.getElementById("table")
    let tr = table.getElementsByTagName("tr")
    for (let i = 2; i < tr.length; i++){
      let td = tr[i].getElementsByTagName("td")[index]
      if(td){
        let txtValue = td.textContent || td.innerText
        if(txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ""
        }else {
          tr[i].style.display = "none"
        }
      }
    }
  }

  function remove(data) {
    let localSolution;
    if(!data.solution) localSolution = ''
    else localSolution = data.solution

    console.log(data)
    console.log(type)
    console.log(localSolution)

    let collection = 'BackUp'
    firebase.firestore().collection(collection)
    .add({
      origem: data.ref,
      descricao: data.description,
      contorno: localSolution
    })

    firebase.firestore().collection(type).doc(data.id).delete().then(document.location.reload(true)) 
  }

  if(isLoading) return <p>Loading</p>

  return(
    <div className='ts-container'>
      <Navbar version={version} />
      <Header pf={IBPF} pj={IBPJ} bo={BO} message={message} status={status}/>
      <Utils/>
      <center className='m-3'>
        <Row>
          <Col><Button variant="outline-success" onClick={getIncidents}>{S0}</Button></Col>
          <Col><Button variant="outline-success" onClick={getProblems}>{S1}</Button></Col>
          <Col><Button variant="outline-success" onClick={getSchedules}>{S2}</Button></Col>
        </Row>
      </center>
      {type &&
        <Table striped bordered hover responsive id='table' style={{maxWidth:'90%', marginLeft: '3%'}} size="sm">
          <tr className='header'>
            {type === S2 ? <TopHeaderTable01/> : <TopHeaderTable02/>}
          </tr>
          {(type === S0 || type === S1) && 
            <tr>
              <td className='group-field'>
              <input 
              className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border text-center'
              type='text'
              //name='filter'
              id='filter-0'
              placeholder='Número'
              onKeyUp={() => filterColumn(0)}/>
              </td>
              <td>
              <input 
                className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border text-center'
                type='text'
                //name='filter'
                id='filter-1'
                placeholder='Buscar por descrição'
                onKeyUp={() => filterColumn(1)}/>
              </td>
              <td>
              <input 
                className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border text-center'
                type='text'
                //name='filter'
                id='filter-2'
                placeholder='Buscar por análise'
                onKeyUp={() => filterColumn(2)}/>
              </td>
              <td></td>
            </tr>
          }
          {type === S2 && 
            <tr>
              <td>
                <input 
                  className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border text-center'
                  type='text'
                  //name='filter'
                  id='filter-0'
                  placeholder='Buscar por análise ou descrição'
                  onKeyUp={() => filterColumn(0)}/>
              </td>
              <td>
              <input 
                className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border text-center'
                type='text'
                //name='filter'
                id='filter-1'
                placeholder='Buscar por erro'
                onKeyUp={() => filterColumn(1)}/>
              </td>
              <td></td>
            </tr>
          }
          {data.map(item => (
            <>
              {type === S0 && <RowIncident data={item} type={type} toDelete={remove}/>}
              {type === S1 && <RowIncident data={item} type={type} toDelete={remove}/>}
              {type === S2 && <RowSchedule data={item}/>}
            </>
          ))}
        </Table>
      }
      <Footer/>
    </div>
  )
}

const TopHeaderTable01 = () => (
  <>
    <th>{TH0}</th>
    <th>{TH1}</th>
    <th>{TH2}</th>  
  </>
)
const TopHeaderTable02 = () => (
  <>
    <th>{TH3}</th>
    <th>{TH0}</th>
    <th>{TH4}</th>
    <th>{TH2}</th>  
  </>
)
const RowIncident = ({data, type, toDelete}) => {
  
  function toRemove(){
    toDelete({
      id: data.id,
      ref: data.origem,
      description: data.descricao,
      solution: data.contorno
    })
  }


  return (
  <tr key={data.id}>
    <td>{data.origem}</td>
    <td>{data.descricao}</td>
    {type === S0 && !data.contorno ? 
      <td>
        {data.contorno = `Favor aguardar retorno do origem ${data.origem}`}
        {data.contorno}
      </td>
      :
      <td>{data.contorno}</td>
    }
    <td >
      <CopyButton txt={data.origem} desc='Referencia'/>
      <CopyButton txt={data.contorno} desc='Análise'/>
      <UsdButton id={data.origem}/> 
      <Button variant='outline-primary'>
        <IconContext.Provider value={{ size: '25px'}}>
          <FaEdit/>
        </IconContext.Provider>
      </Button>
      <Button variant="outline-danger" onClick={toRemove}>
        <IconContext.Provider value={{ size: '25px'}}>
          <MdDelete/>
        </IconContext.Provider>
      </Button>
    </td>
  </tr>
)
}

const RowSchedule = ({data}) => (
    <tr key={data.id}>
      <td>{data.origem}</td>
      <td>{data.descricao}</td>
      <td >
        <CopyButton txt={data.origem}/>
        <Button variant='outline-primary' >
          <IconContext.Provider value={{ size: '25px'}}>
            <FaEdit/>
          </IconContext.Provider>
        </Button>
        <Button variant="outline-danger">
          <IconContext.Provider value={{ size: '25px'}}>
            <MdDelete/>
          </IconContext.Provider>
        </Button>
      </td>
    </tr>
) 