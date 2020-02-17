import React from 'react';
import './App.css';
import { Layout } from './components/layout/layout';
import Login from './pages/login/login';

export class App extends React.Component {
  render(): JSX.Element {
    return (<Layout>
      <Login />
    </Layout>)
  }
}

export default App;
