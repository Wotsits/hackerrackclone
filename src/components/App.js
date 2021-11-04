import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom"

import LinkList from './LinkList';
import CreateLink from './CreateLink';
import Header from './Header'
import Login from './Login'
import Search from './Search'



class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/search" component={Search} />
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
        </Switch>
      </>
  )
  }
}

export default App;
