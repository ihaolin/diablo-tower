import React, {PropTypes } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import {I18n} from '../../common/i18n/main';
import I18nText from '../../common/i18n_text/main';
import {Ajax} from '../../common/ajax/main';
import AppSelect from '../app_select/main'; 

const FormItem = Form.Item;

let AppEdit = React.createClass({
  
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

        // submit validated pass
        Ajax.post('/admins/apps', values, function(jsonData){
          
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

    const currentApp = this.props.app;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    // app name tip
    const nameInputTip = I18n.getText('input') + ' ' + I18n.getText('app.name') + " " + I18n.getText('name.tip');
    const nameDisable = !(currentApp.id === null || currentApp.id === undefined);

    // app key tip
    const keyInputTip = I18n.getText('input') + ' ' + I18n.getText('app.key');

     // app desc tip
    const descInputTip = I18n.getText('input') + ' ' + I18n.getText('app.desc');

    return (
      <div>
        <Modal 
          title={I18n.getText('app.edit')}
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
              label={I18n.getText('app.name')} 
              hasFeedback>
              {getFieldDecorator('appName', {
                initialValue: currentApp.appName,
                rules: [
                  { required: true, validator: this.checkNameInput },
                ]
              })(
                <Input disabled={nameDisable} placeholder={nameInputTip} />
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={I18n.getText('app.key')} 
              hasFeedback>
              {getFieldDecorator('appKey', {
                initialValue: currentApp.appKey,
                rules: [
                  { required: true, whitespace: true, message: keyInputTip },
                ]
              })(
                 <Input placeholder={keyInputTip} />
              )}
            </FormItem>

            
            <FormItem
              {...formItemLayout}
              label={I18n.getText('app.desc')}>
              {getFieldDecorator('appDesc', {
                initialValue: currentApp.appDesc,
                rules: [
                  { message: descInputTip },
                ]
              })(
                 <Input placeholder={descInputTip} />
              )}
            </FormItem>

            { nameDisable ? null : 
              (
                <FormItem
                  {...formItemLayout}
                  label={I18n.getText('app.inherit')}>
                  {getFieldDecorator('inheritAppId', {
                    initialValue: ''
                  })(
                     <AppSelect />
                  )}
                </FormItem>
              )
            }
          </Form>

        </Modal>
      </div>
    );
  }
});

// create edit form
AppEdit = Form.create()(AppEdit);

AppEdit.propTypes = {
  app: React.PropTypes.object.isRequired
};

export default AppEdit;
