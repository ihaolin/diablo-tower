import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import NotFound from '../components/common/not_found/main';
import Layout from '../layouts/layout/main';
import Apps from '../components/apps/main';
import Configs from '../components/configs/main';
import Servers from '../components/servers/main';
import PushLogs from '../components/pushlogs/main';
import Clients from '../components/clients/main';

const Routes = ({ history }) =>
  <Router history={history}>
  	<Route path="/" component={Layout}>
  		<IndexRoute component={Apps} />
  		<Route path="/configs" component={Configs} />
    	<Route path="/servers" component={Servers} />
    	<Route path="/pushlogs" component={PushLogs} />
      <Route path="/clients" component={Clients} />
  	</Route>
    <Route path="*" component={NotFound}/>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
