import React, {PropTypes } from 'react';
import { Table, Button } from 'antd';
import styles from './main.less';
import {I18n} from '../common/i18n/main';
import I18nText from '../common/i18n_text/main';
import {Ajax} from '../common/ajax/main';
import SearchInput from '../common/search_input/main';
import AppEdit from './app_edit/main';
import AppDelete from './app_delete/main';

const Apps = React.createClass({
  
  getInitialState() {
    return {
      loading: true,
      apps: [],
      pagination: false,
      pageSize: 100000, // load all apps
      searchAppName: '',
      editingApp: null,
      deletingApp: null
    };
  },

  componentDidMount() {
    this.loadApps(1);
  },

  loadApps(pageNo, appName){

    appName = appName || '';
  
    const self = this;
    self.setState({ loading: true });

    const pageSize = this.state.pageSize;
    Ajax.get('/admins/apps', {pageNo: pageNo, pageSize: pageSize, appName: appName}, function(jsonData){
        var d = jsonData;
        self.setState({
          loading: false,
          apps: d.data,
          searchAppName: appName,
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
    this.loadApps(p.current);
  },

  onAdd(){
    this.setState({
      editingApp: {
        appName: '',
        appKey: '',
        appDesc: ''
      }
    });
  },

  onRefresh(){
    this.loadApps(this.state.pagination.current, this.state.searchAppName);
  },

  onUpdate(app){
    this.setState({editingApp: app});
  },

  onDelete(app){
    this.setState({deletingApp: app});
  },

  onEditSubmitted(){
    this.setState({editingApp: null});
    this.loadApps(this.state.pagination.current);
  },

  onEditCanceled(){
    this.setState({editingApp: null});
  },

  onDeleteSubmitted(){
    this.setState({deletingApp: null});
    this.loadApps(this.state.pagination.current);
  },

  onDeleteCanceled(){
    this.setState({deletingApp: null});
  },

  onSearch(appName){
    this.loadApps(1, appName);
  },

  render() {

    const self = this;

    const editingApp = this.state.editingApp;
    const deletingApp = this.state.deletingApp;

    return (
      <div>
        <div className={styles.oplist} >
          
          <SearchInput style={{width: 220}}
                       placeholder={I18n.getText('input.fullname')} 
                       onSearch={this.onSearch} />

          <Button className={styles.opbtn} type="primary" onClick={this.onAdd}>
            <I18nText code="add" />
          </Button>
          <Button className={styles.opbtn} type="primary" onClick={this.onRefresh}>
            <I18nText code="refresh" />
          </Button>
        </div>
        <Table
          columns={[
            { title: I18n.getText('id'), dataIndex: 'id', key: 'id', width: '10%'}, 
            { title: I18n.getText('name'), dataIndex: 'appName', key: 'appName', width: '20%'}, 
            { title: I18n.getText('desc'), dataIndex: 'appDesc', key: 'appDesc', width: '30%'}, 
            { title: I18n.getText('operation'), key: 'operation',
              render(text, record) {
                return (
                  <span>
                    <a href="#" onClick={() => self.onUpdate(record)}>
                      <I18nText code="update" />
                    </a>
                    <span className="ant-divider"></span> 
                    <a href="#" onClick={() => self.onDelete(record)}>
                      <I18nText code="delete" />
                    </a>
                  </span>
                );
              }
            }
          ]} 
          dataSource={this.state.apps} 
          loading={this.state.loading}
          pagination={this.state.pagination}
          scroll={{ y: 470 }} 
          onChange={this.onPageChange}/>
        { editingApp === null ? null : 
            <AppEdit app={editingApp} onSubmitted={this.onEditSubmitted} onCanceled={this.onEditCanceled} /> }
        { deletingApp === null ? null : 
            <AppDelete app={deletingApp} onSubmitted={this.onDeleteSubmitted} onCanceled={this.onDeleteCanceled}/> }
      </div>
    );
  },
});

Apps.propTypes = {
};

export default Apps;