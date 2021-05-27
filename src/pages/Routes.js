import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PromotionSearch from './promotionSearch';
import PromotionForm from './promotionForm';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PromotionSearch} />
        <Route path="/create" component={PromotionForm} />
        <Route path="/edit/:id" component={PromotionForm} />
      </Switch>
    </Router>
  );
};

export default Routes;