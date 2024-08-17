import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Routes from './routes'

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes />
      </div>
    </BrowserRouter>
  );
}

export default App;
