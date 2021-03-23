import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import firebase from '../utils/api/firebase'

import Home from '../views/Home';
import EditView from '../views/Edit';
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Router(){

  const [version, setVersion] = useState(null)

  useEffect(() => {
    firebase
    .database()
    .ref('versao')
    .on('value', snapshot => {
      setVersion(snapshot.val())
    })
  })
  
  return(
    <>
      <MainNavbar version={version}/>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/edit:id/:collection" exact component={EditView} />
        </Switch>
      </BrowserRouter>
      <Footer/>
    </>
  )
}