import React, {PropTypes } from 'react';
import { Table, Button, Icon, Tooltip } from 'antd';
import styles from './main.less';
import {I18n} from '../common/i18n/main';
import I18nText from '../common/i18n_text/main';
import {Ajax} from '../common/ajax/main';
import AppSelect from '../apps/app_select/main'; 

const Clients = React.createClass({
  getInitialState() {
    return {
      loading: false,
      clients: [],
      appId: null, 
    };
  },

  loadClients(appId){

    const self = this;
    self.setState({ loading: true });

    Ajax.get('/admins/clients', {appId: appId}, function(clientsData){
        self.setState({
          loading: false,
          clients: clientsData,
          appId: appId
        });
    });

  },

  onRefresh(){
    this.loadClients(this.state.appId);
  },

  onAppChange(appId){
    this.loadClients(appId);
  },

  render() {

    const self = this;

    return (
      <div>

        <div className={styles.oplist} >
          <AppSelect onChange={this.onAppChange} />
          <Button className={styles.opbtn} type="primary" onClick={this.onRefresh}>
            <I18nText code="refresh" />
          </Button>
        </div>

        <Table
          columns={[
            { title: I18n.getText('client.addr'), dataIndex: 'addr', key: 'addr', width: '30%'}, 
            { title: I18n.getText('client.server'), dataIndex: 'server', key: 'server', width: '30%'},
            { title: I18n.getText('client.uptime'), dataIndex: 'uptime', key: 'uptime', width: '40%'}
          ]} 
          dataSource={this.state.clients} 
          loading={this.state.loading}
          pagination={false}
          scroll={{ y: 470 }} />
      </div>
    );
  },
});

Clients.propTypes = {
};

export default Clients;