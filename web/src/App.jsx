import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { PagesModule } from './modules/pages/pages-module';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <PagesModule/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
