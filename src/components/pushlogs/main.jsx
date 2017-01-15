import React, {PropTypes } from 'react';
import { Table, Button } from 'antd';
import styles from './main.less';
import {I18n} from '../common/i18n/main';
import I18nText from '../common/i18n_text/main';
import {Ajax} from '../common/ajax/main';
import AppSelect from '../apps/app_select/main'; 


const PushLogs = React.createClass({
  
  getInitialState() {
    return {
      loading: false,
      logs: [],
      pagination: false,
      pageSize: 10,
      appId: null, 
    };
  },

  loadPushLogs(appId, pageNo){
  
    const self = this;
    self.setState({ loading: true });

    const pageSize = this.state.pageSize;

    Ajax.get('/admins/push_logs', {appId: appId, pageNo: pageNo, pageSize: pageSize}, function(jsonData){
        var d = jsonData;
        self.setState({
          loading: false,
          logs: d.data,
          appId: appId,
          pagination: {
            current: pageNo,
            total: d.total,
            pageSize: pageSize,
            showTotal: (total) => I18n.formatText('total', total)
          }
        });
    });
  },

  onPageChange(p){
    this.loadPushLogs(this.state.appId, p.current);
  },

  onRefresh(){
    const {appId, pagination} = this.state;
    this.loadPushLogs(appId, pagination.current);
  },

  onAppChange(appId){
    this.loadPushLogs(appId, 1);
  },

  render() {

    const self = this;

    const appId = this.state.appId;
  
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
            { title: I18n.getText('log'), key: 'log',
              render(text, log) {
                var logTxt = I18n.formatText('push.log.content', log.time, log.server, log.config, log.client);
                return (
                  <span>
                    {logTxt}
                  </span>
                );
              }
            }
          ]}
          showHeader={false}
          dataSource={this.state.logs} 
          loading={this.state.loading}
          pagination={this.state.pagination}
          scroll={{ y: 470 }} 
          onChange={this.onPageChange}/>
      </div>
    );
  },
});

PushLogs.propTypes = {
};

export default PushLogs;