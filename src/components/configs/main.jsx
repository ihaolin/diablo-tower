import React, {PropTypes } from 'react';
import { Table, Button } from 'antd';
import styles from './main.less';
import {I18n} from '../common/i18n/main';
import I18nText from '../common/i18n_text/main';
import {Ajax} from '../common/ajax/main';
import SearchInput from '../common/search_input/main';
import AppSelect from '../apps/app_select/main'; 
import ConfigEdit from './config_edit/main';
import ConfigDelete from './config_delete/main';


const Configs = React.createClass({
  
  getInitialState() {
    return {
      loading: false,
      configs: [],
      pagination: false,
      pageSize: 10,
      appId: null, 
      searchConfigName: '',
      editingConfig: null,
      deletingConfig: null
    };
  },

  loadConfigs(appId, pageNo, configName){

    configName = configName || '';
  
    const self = this;
    self.setState({ loading: true });

    const pageSize = this.state.pageSize;

    Ajax.get('/admins/configs', {appId: appId, configName: configName, pageNo: pageNo, pageSize: pageSize}, function(jsonData){
        var d = jsonData;
        self.setState({
          loading: false,
          configs: d.data,
          appId: appId,
          searchConfigName: configName,
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
    this.loadConfigs(this.state.appId, p.current);
  },

  onAdd(){
    this.setState({ editingConfig: {} });
  },

  onRefresh(){
    const {appId, pagination, searchConfigName} = this.state;
    this.loadConfigs(appId, pagination.current, searchConfigName);
  },

  onUpdate(config){
    this.setState({editingConfig: config});
  },

  onDelete(config){
    this.setState({deletingConfig: config});
  },

  onEditSubmitted(){
    this.setState({editingConfig: null});
    this.onRefresh();
  },

  onEditCanceled(){
    this.setState({editingConfig: null});
  },

  onDeleteSubmitted(){
    this.setState({deletingConfig: null});
    this.onRefresh();
  },

  onDeleteCanceled(){
    this.setState({deletingConfig: null});
  },

  onSearch(configName){
    this.loadConfigs(this.state.appId, 1, configName);
  },

  onAppChange(appId){
    this.loadConfigs(appId, 1, this.state.searchConfigName);
  },

  render() {

    const self = this;

    const appId = this.state.appId;
    const editingConfig = this.state.editingConfig;
    const deletingConfig = this.state.deletingConfig;

    return (
      <div>
        <div className={styles.oplist} >
          
          <AppSelect onChange={this.onAppChange} />

          <SearchInput style={{width: 220, marginLeft: 5}}
                       placeholder={I18n.getText('input.fullname')} 
                       onSearch={this.onSearch} disabled={appId === null}/>

          <Button className={styles.opbtn} type="primary" onClick={this.onAdd} disabled={appId === null}>
            <I18nText code="add" />
          </Button>
          <Button className={styles.opbtn} type="primary" onClick={this.onRefresh}>
            <I18nText code="refresh" />
          </Button>
        </div>
        <Table
          columns={[
            { title: I18n.getText('id'), dataIndex: 'id', key: 'id', width: '10%'}, 
            { title: I18n.getText('name'), dataIndex: 'name', key: 'name', width: '20%'}, 
            { title: I18n.getText('value'), dataIndex: 'value', key: 'value', width: 500}, 
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
          dataSource={this.state.configs} 
          loading={this.state.loading}
          pagination={this.state.pagination}
          scroll={{ y: 470 }} 
          onChange={this.onPageChange}/>

          { editingConfig === null ? null : 
            <ConfigEdit appId={appId} config={editingConfig} onSubmitted={this.onEditSubmitted} onCanceled={this.onEditCanceled} /> }
          { deletingConfig === null ? null : 
            <ConfigDelete appId={appId} config={deletingConfig} onSubmitted={this.onDeleteSubmitted} onCanceled={this.onDeleteCanceled} /> }
      </div>
    );
  },
});

Configs.propTypes = {
};

export default Configs;