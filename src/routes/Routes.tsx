import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import Contributor from '../pages/Contributor';
import Home from '../pages/Home';
import Repository from '../pages/Repository';
import RepositoryList from '../pages/RepositoryList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repositores" component={Repository} />
      <Route exact path="/repositores/:id" component={RepositoryList} />
      <Route exact path="/contributors/:id" component={Contributor} />
    </Switch>
  )
}
