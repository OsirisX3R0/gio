import React from 'react'

import './scss/style.scss'
import { GlobalProvider } from './context/GlobalContext';
import Addresses from './components/Addresses';

function App() {
  return (
    <GlobalProvider>
      <div className='container'>
        <h1>gio</h1>
        <Addresses />
      </div>
    </GlobalProvider>
  );
}

export default App;
