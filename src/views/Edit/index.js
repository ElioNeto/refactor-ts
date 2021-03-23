import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { S2, SUCCESS_STORE } from '../../utils/constants';
import firebase from '../../utils/api/firebase'
import { Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { TiArrowBackOutline } from 'react-icons/ti';
import { FaSave } from 'react-icons/fa';
import Loading from '../../components/Loading';

export default function EditView(){

  const [ref, setRef] = useState(null)
  const [description, setDescription] = useState(null)
  const [solution, setSolution] = useState(null)  
  const [isLoading, setIsLoading] = useState(true)

  let { id, collection } = useParams()
 
  function cancel(){
    window.location.href = "/"
  }

  function save(e){
    e.preventDefault()
    if(window.confirm(SUCCESS_STORE)){
      let localSolution
      const db = firebase.firestore().collection(collection).doc(id)
      if(!solution){
        if(collection === S2){
          db.update({
            origem: ref,
            descricao: description,
          })
          return
        }else localSolution = ''
      }else localSolution = solution
      db.update({
        origem: ref,
        contorno: localSolution,
        descricao: description
      })
    }
  }

  function load(){
    setIsLoading(true)
    console.log('teste');
    firebase.firestore().collection(collection).doc(id)
    .get()
    .then( doc => {
      if(!doc.exists) console.log('No such document!')
      else {
        setRef(doc.data().origem)
        setDescription(doc.data().descricao)
        if(collection !== S2) setSolution(doc.data().contorno)
        setIsLoading(false)
      }
    })
    .catch(err => console.log('Error gettin document', err))
    //setIsLoading(false)
  }

  useEffect(() => {
    load()
    //setIsLoading(false)
  }, [])
 
  if(isLoading)return<Loading/>

  return(
    <>
      <form onSubmit={e => save(e)} className='m-30'>
        <h3><span className='addMarker'>#</span>{collection}</h3>
        <input 
          className='fullWidth shadow-0-0-15-4-black-6 rounded-input without-outline without-border addMarker field'
          type='text'
          name='description'
          placeholder='Descrição'
          onChange={e => {setDescription(e.target.value)}}
          value={description}
          required
        />
        <input 
          className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border addMarker'
          type='text'
          name='refernce'
          placeholder='Referência'
          onChange={e => {setRef(e.target.value)}}
          value={ref}
          required
        />
        {collection !== S2 &&
          <input 
          className='fullWidth field shadow-0-0-15-4-black-6 rounded-input without-outline without-border addMarker'
          type='text'
          name='solution'
          placeholder='Análise'
          onChange={e => {setSolution(e.target.value)}}
          value={solution}
        /> 
        }
        <Button variant="danger" onClick={cancel}>
          <IconContext.Provider value={{ size: '30px' }}>
            <TiArrowBackOutline/>
          </IconContext.Provider>
        </Button>&nbsp;
        <Button variant="success" type="submit">
          <IconContext.Provider value={{ size: '30px' }}>
            <FaSave/>
          </IconContext.Provider>
        </Button>
      </form>
    </>
  )
}