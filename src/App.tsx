import React from 'react';
import './App.css';
import { Layout } from './components/layout/layout';
import { HeaderLink } from './components/layout/header';
import Login from './pages/login/login';
import Main from './pages/main/main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export class App extends React.Component {
  render(): JSX.Element {
    const links: HeaderLink[] = [
      { name: 'Pepega', route: '/' }
    ];
    return (
      <Router>
        <Layout links={links}>
          <Switch>
            <Route ref="/login" component={Main} />
            <Route ref="/" component={Login} />
          </Switch>
        </Layout >
      </Router>
    )
  }
}

export default App;
