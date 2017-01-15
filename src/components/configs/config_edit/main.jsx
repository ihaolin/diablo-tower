import React, {PropTypes } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {I18n} from '../../common/i18n/main';
import I18nText from '../../common/i18n_text/main';
import {Ajax} from '../../common/ajax/main';

const FormItem = Form.Item;

let ConfigEdit = React.createClass({
  
  getInitialState() {
      return {
          submitting: false  
      };
  },

  handleSubmit(){

    const self = this;

    // start submiting
    self.setState({ submitting: true });

    // validate form
    self.props.form.validateFields((errors, values) => {
      if (!errors) {
        // set app id
        values.appId = self.props.appId;
        
        // submit validated pass
        Ajax.post('/admins/configs', values, function(jsonData){
          
          // stop submiting when post finished
          self.setState({ submitting: false });

          // callback parent
          (self.props.onSubmitted && self.props.onSubmitted());
        });
      } else {
        // stop submiting when validate failed
        self.setState({ submitting: false });
      }
    });
  },

  handleCancel(){
    // callback parent
    this.props.onCanceled();
  },

  checkNameInput(rule, value, callback){
    if (/^[A-Za-z0-9_]+$/.test(value)) {
      callback();   
    } else {
      callback(I18n.formatText('field.format.error', I18n.getText('name.tip')));
    }
  },

  render(){

    const currentConfig = this.props.config;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    // config name tip
    const nameInputTip = I18n.getText('input') + ' ' + I18n.getText('config.name') + " " + I18n.getText('name.tip');
    const nameDisable = !(currentConfig.id === null || currentConfig.id === undefined);

    // config value tip
    const valueInputTip = I18n.getText('input') + ' ' + I18n.getText('config.value');

    return (
      <div>
        <Modal 
          title={I18n.getText('config.edit')}
          wrapClassName="vertical-center-modal"
          visible={true}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText={I18n.getText('submit')}
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
                    loading={this.state.submitting} 
                    onClick={this.handleSubmit}>
              <I18nText code="submit" />
            </Button>,
          ]}>
    
           <Form horizontal>

            <FormItem
              {...formItemLayout}
              label={I18n.getText('config.name')} 
              hasFeedback>
              {getFieldDecorator('name', {
                initialValue: currentConfig.name,
                rules: [
                  { required: true, validator: this.checkNameInput, message: nameInputTip },
                ]
              })(
                <Input disabled={nameDisable} placeholder={nameInputTip} />
              )}
            </FormItem>

             <FormItem
              {...formItemLayout}
              label={I18n.getText('config.value')} 
              hasFeedback>
              {getFieldDecorator('value', {
                initialValue: currentConfig.value,
                rules: [
                  { required: true, message: valueInputTip },
                ]
              })(
                <Input type="textarea" autosize={{minRows: 6}} placeholder={valueInputTip} />
              )}
            </FormItem>
            
          </Form>

        </Modal>
      </div>
    );
  }
});

// create edit form
ConfigEdit = Form.create()(ConfigEdit);

ConfigEdit.propTypes = {
  appId: React.PropTypes.string.isRequired,
  config: React.PropTypes.object.isRequired
};

export default ConfigEdit;
