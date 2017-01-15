import './index.html';
import './app.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import Routes from '../routes/index';
import Layout from '../layouts/layout/main';

ReactDOM.render(<Routes history={browserHistory} />, document.getElementById('app'));
