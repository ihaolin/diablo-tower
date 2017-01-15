import React, {PropTypes } from 'react';
import { Table, Button, Icon, Tooltip } from 'antd';
import styles from './main.less';
import {I18n} from '../common/i18n/main';
import I18nText from '../common/i18n_text/main';
import {Ajax} from '../common/ajax/main';
import ServerCleanCache from './server_clean_cache/main.jsx';
import ServerShutdown from './server_shutdown/main.jsx';

const Servers = React.createClass({
  getInitialState() {
    return {
      loading: true,
      servers: [],
      cleaningServer: null,
      shutdowningServer: null,
    };
  },

  componentDidMount() {
    this.loadServers();
  },

  loadServers(){

    const self = this;
    self.setState({ loading: true });

    Ajax.get('/admins/servers', {}, function(jsonData){
        self.setState({
          loading: false,
          servers: jsonData
        });
    });

  },

  onCleanCache(server){
    this.setState({cleaningServer: server});
  },

  onCleaned(){
    this.setState({cleaningServer: null});
  },

  onShutdown(server){
    this.setState({shutdowningServer: server});
  },

  onShutdownSubmitted(){
     this.setState({shutdowningServer: null});
     this.loadServers();
  },

  onShutdownCanceled(){
     this.setState({shutdowningServer: null});
  },

  onRefresh(){
    this.loadServers();
  },

  render() {

    const self = this;
    const cleaningServer = this.state.cleaningServer;
    const shutdowningServer = this.state.shutdowningServer;

    return (
      <div>

         <div className={styles.oplist} >
          <Button className={styles.opbtn} type="primary" onClick={this.onRefresh}>
            <I18nText code="refresh" />
          </Button>
        </div>

        <Table
          columns={[
            { title: '', key: 'leader', width: '3%', 
              render(text, record) {
                return (
                  <Tooltip title={record.leader === true ? 'Leader' : 'Follower'}>
                     <Icon type={record.leader === true ? 'star' : 'star-o'} />
                  </Tooltip>
                );
              }
            },
            { title: I18n.getText('host'), dataIndex: 'server', key: 'server', width: '20%'}, 
            { title: I18n.getText('client.count'), key: 'clientCount', width: '20%', 
              render(text, record) {
                var clientCount = record.clientCount === null ? 'N/A' : record.clientCount;
                return (
                  <span>
                    {clientCount}
                  </span>
                );
              }
            },
            { title: I18n.getText('status'), key: 'status', width: '20%', 
              render(text, record) {
                return (
                  <span className={record.status === 1 ? styles.online : styles.offline}>
                    {record.statusDesc}
                  </span>
                );
              }
            },
            { title: I18n.getText('operation'), key: 'operation',
              render(text, record) {
                return (
                  <span>
                    {record.status === 1 ? ( <a href="#" onClick={() => self.onCleanCache(record)}><I18nText code="clean.cache" /></a>) : null}
                    {record.status === 1 ? (<span className="ant-divider"></span>) : null}
                    {record.status === 1 ? ( <a href="#" onClick={() => self.onShutdown(record)}><I18nText code="shutdown" /></a>) : null}
                  </span>
                );
              }
            }
          ]} 
          dataSource={this.state.servers} 
          loading={this.state.loading}
          pagination={false}
          scroll={{ y: 470 }} />

          { cleaningServer === null ? null : 
            <ServerCleanCache server={cleaningServer} onSubmitted={this.onCleaned} onCanceled={this.onCleaned} /> }

          { shutdowningServer === null ? null : 
            <ServerShutdown server={shutdowningServer} onSubmitted={this.onShutdownSubmitted} onCanceled={this.onShutdownCanceled} /> }
      </div>
    );
  },
});

Servers.propTypes = {
};

export default Servers;