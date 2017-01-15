import React, {PropTypes } from 'react';
import { Select } from 'antd';
import {I18n} from '../../common/i18n/main';
import {Ajax} from '../../common/ajax/main';

const Option = Select.Option;

const AppSelect = React.createClass({
  
  getInitialState() {
      return {
        apps:[]
      };
  },

  componentDidMount() {
    this.loadApps();
  },

  loadApps(){
    const self = this;

    // load all apps
    Ajax.get('/admins/apps', {pageNo: 1, pageSize: 100000}, function(jsonData){
        var d = jsonData;
        self.setState({
          apps: d.data
        });
    });
  },

  render(){

    const apps = this.state.apps; 

    return (
       <Select showSearch
            style={{ width: 200 }}
            placeholder={I18n.getText('app.select')}
            optionFilterProp="children"
            notFoundContent={I18n.getText('not.found')}
            onChange={this.props.onChange}>

              {apps.map((app, index) => (
                <Option key={app.id} value={app.id.toString()}>{app.appName}</Option>        
              ))}
          
        </Select>
    );
  }
});

AppSelect.propTypes = {
	
};

export default AppSelect;