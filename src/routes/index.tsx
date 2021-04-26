import React from 'react'
import {
  Switch,
  Route
} from "react-router-dom";

import Contributor from '../pages/Contributor';
import Home from '../pages/Home';
import Repository from '../pages/Repository';
import Error from '../components/Error';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/repos/:name" component={Repository} />
      <Route exact path="/contributors/:username" component={Contributor} />
      <Route  path="*" component={Error} />
    </Switch>
  )
}
