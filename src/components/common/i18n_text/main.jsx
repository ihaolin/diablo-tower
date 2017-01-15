import React, { Component, PropTypes } from 'react';
import {I18n} from '../i18n/main';

class I18nText extends Component {

  constructor(props) {
    super(props);
  }

  render(){
  	
    let txt;
    const args = this.props.args;
    if (args){
    	txt = I18n.formatText(this.props.code, args);
    } else {	
    	txt = I18n.getText(this.props.code);
    }

    return (
      <span> { txt } </span>
    );
  }

};

I18nText.propTypes = {};

export default I18nText;
