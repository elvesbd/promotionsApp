import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Search from './Search';
import Form from './Form';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Search} />
        <Route path="/create" component={Form} />
        <Route path="/edit/:id" component={Form} />
      </Switch>
    </Router>
  );
};

export default Routes;