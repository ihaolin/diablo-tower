import React, {PropTypes } from 'react';
import { Modal, Button} from 'antd';
import {I18n} from '../../common/i18n/main';
import I18nText from '../../common/i18n_text/main';
import {Ajax} from '../../common/ajax/main';

const ConfigDelete = React.createClass({
  
  getInitialState() {
      return {
          confirming: false  
      };
  },

  handleSubmit(){

    const self = this;

    const {appId, config} = this.props;

    // start submiting
    self.setState({ confirming: true });

    Ajax.post('/admins/configs/del', {appId: appId, configName: config.name}, function(jsonData){
      
      // stop submiting when post finished
      self.setState({ confirming: false });

      // callback parent
      (self.props.onSubmitted && self.props.onSubmitted());
    });
  },

  handleCancel(){
    // callback parent
    this.props.onCanceled();
  },

  render(){

    var config = this.props.config;

    return (
      <div>
        <Modal 
          title={I18n.getText('config.delete')}
          wrapClassName="vertical-center-modal"
          visible={true}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText={I18n.getText('confirm')}
          cancelText={I18n.getText('cancel')}
          closable={true}
          footer={[
            <Button key="back" 
                    type="ghost" 
                    size="large" 
                    onClick={this.handleCancel}>
              <I18nText code="cancel" />
            </Button>,
            <Button key="submit" 
                    type="primary" 
                    size="large" 
                    loading={this.state.confirming} 
                    onClick={this.handleSubmit}>
              <I18nText code="confirm" />
            </Button>,
          ]}>
          <I18nText code="config.delete.confirm" args={[config.name]} />
        </Modal>
      </div>
    );
  }
});

ConfigDelete.propTypes = {
  appId: React.PropTypes.string.isRequired,
  config: React.PropTypes.object.isRequired
};

export default ConfigDelete;