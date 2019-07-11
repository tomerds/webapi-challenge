import './App.css';

import React from 'react';
import { Link } from 'react-router-dom';

import List from './components/List';


function App() {
  return (
    <Link to='/actions'>
      <List />
    </Link>
  );
}

export default App;
