import React, { Component, PropTypes } from 'react';
import { Row, Col, Menu, Dropdown, Icon, Button } from 'antd';
import {I18n} from '../../components/common/i18n/main';
import styles from './main.less';


function onClickMenu(event) {
	var menuKey = event.key;
	if (menuKey === '1'){
		alert("not support");
	}
}

const HeaderMenu = (
  	<Menu onClick={onClickMenu} >
    	<Menu.Item key="1" >
    		{I18n.getText('exit')}
    	</Menu.Item>
	</Menu>
);

const TopHeader = React.createClass({
	
	getInitialState() {
	    return {
	         lang: I18n.lang
	    };
	},

	switchLang(){
		var lang = this.state.lang;
		lang = lang === 'en' ? 'zh' : 'en';
		I18n.setLang(lang);
		window.location.reload();
	},

	render(){

		const lang = this.state.lang;

		return (
			<div className={styles.head}>
				<Row>
					<Col span={20}>
						<h1 className={styles.logo}>Diablo Tower</h1>
					</Col>
					<Col span={1}>
						<Button className={styles.btns} type="ghost">
					        <a href="https://github.com/ihaolin/diablo" target="_blank"><Icon type="github" /></a>
					    </Button>
					</Col>
		       		<Col span={2}>
		       			<Dropdown overlay={HeaderMenu} >
					      <Button className={styles.btns} style={{width: '95%'}} type="ghost">
					        <Icon type="user" />admin <Icon type="down" />
					      </Button>
					    </Dropdown>
		       		</Col>
		       		<Col span={1}>
				      <Button className={styles.btns} type="ghost" onClick={this.switchLang}>
				        {lang === 'en' ? 'ZH' : 'EN'}
				      </Button>
		       		</Col>
			    </Row>
		  	</div>
		);
	}
});

TopHeader.propTypes = {
};

export default TopHeader;