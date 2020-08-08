import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import { Header } from './components/Header/Header';
// import { Photos } from './components/Photos/Photos';
import {PhotosContainer} from './components/Photos/PhotosContainer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path = "/home" render = {() => <Main />} />
      <Route path = "/photos" render = {() => <PhotosContainer />} />
    </BrowserRouter>
      
   
  );
}

export default App;
