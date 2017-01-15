import React, {PropTypes } from 'react';
import { Modal, Button} from 'antd';
import {I18n} from '../../common/i18n/main';
import I18nText from '../../common/i18n_text/main';
import {Ajax} from '../../common/ajax/main';

const ServerShutdown = React.createClass({
  
  getInitialState() {
      return {
          confirming: false  
      };
  },

  handleSubmit(){

    const self = this;

    const {server} = this.props;

    // start submiting
    self.setState({ confirming: true });

    Ajax.post('/admins/servers/shutdown', {server: server.server}, function(jsonData){
      
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

    var server = this.props.server;

    return (
      <div>
        <Modal 
          title={I18n.getText('server.shutdown')}
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
          <I18nText code="server.shutdown.confirm" args={[server.server]} />
        </Modal>
      </div>
    );
  }
});

ServerShutdown.propTypes = {
  server: React.PropTypes.object.isRequired
};

export default ServerShutdown;