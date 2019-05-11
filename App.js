/**
 * Created by PhpStorm.
 * User: TJ 
 * Date: 20/01/19
 * Time: 11:30 AM
 */
 

import React, { Fragment } from 'react';
import {
  Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import history from 'Services/BrowserHistory';
import requireAuth from 'Components/HOC/requireAuth';
import KnowledgePage from 'Pages/Knowledge/Knowledge';
import Knowledgegraph from 'Pages/KnowledgeGraph/KnowledgeGraph';
import SignUp from 'Containers/SignUp';
import Login from 'Containers/Login';
import Main from 'Pages/Main';
import Modal from 'Containers/Modal';
import Argumentation from 'Pages/Argumentation';
import Topics from 'Pages/Topics/Topics';
import { store } from './services/Redux';

import AuthService from './services/AuthService';

class App extends React.Component {
  componentDidMount() {
    AuthService.checkAuthentication();
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router history={history}>
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/argumentation" component={requireAuth(Main)} />
              <Route exact path="/Knowledge" component={requireAuth(KnowledgePage)} />
              <Route exact path="/knowledge/:knowledgeId" component={requireAuth(Knowledgegraph)} />
              <Route exact path="/argumentation/:argumentationId" component={requireAuth(Argumentation)} />
              <Route exact path="/topics" component={requireAuth(Topics)} />
              <Route render={() => <Redirect to="/argumentation" />} />
            </Switch>
          </Router>
          <Modal />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
