import React from 'react';
import './App.css';
import {Layout} from './core/components/layout/layout';
import {HeaderLink} from './core/components/layout/header';
import Login from './modules/login/login';
import Main from './modules/main/main';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

export class App extends React.Component {
  render(): JSX.Element {
    const links: HeaderLink[] = [
      {name: 'Pepega', route: '/'},
    ];
    return (
      <Router>
        <Layout links={links}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </Layout >
      </Router>
    );
  }
}

export default App;
