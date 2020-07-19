import React from 'react'

import './scss/style.scss'
import Addresses from './scss/components/Addresses'
import { GlobalProvider } from './scss/context/GlobalContext';

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
