import * as React from 'react';
import { BrowserRouter, Router, Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import News from './News';
import Comments from './Comments';
import ScrollToTop from './ScrollToTop';

const App: React.SFC = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Header />
      <Switch>
        <Route exact path="/news/:page" component={News} />
        <Route exact path="/item/:id" component={Comments} />
        <Redirect from="/" to="/news/1" />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
);

export default App;
