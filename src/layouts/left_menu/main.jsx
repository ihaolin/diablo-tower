import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
import styles from './main.less';
const SubMenu = Menu.SubMenu;
import I18nText from '../../components/common/i18n_text/main';
import {Storage} from '../../components/common/storage/main';

const LeftMenu = React.createClass({
  getInitialState() {
    return {
      current: Storage.sessionGet('selected_key') || '1',
      openKeys: [Storage.sessionGet('opened_key') || "apps"],
    };
  },
  handleClick(e) {
    this.setState({ current: e.key });
    Storage.sessionSet('selected_key', e.key);
  },
  
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => !(this.state.openKeys.indexOf(key) > -1));
    this.setState({ openKeys: this.getKeyPath(latestOpenKey) });
    Storage.sessionSet('opened_key', latestOpenKey);
  },

  getKeyPath(key) {
    const map = {
      apps: ['apps'],
      configs: ['configs'],
      cluster: ['cluster'],
    };
    return map[key] || [];
  },

  render() {

    return (
      <Menu className={styles.menu} theme="dark"
      	onClick={this.handleClick}
        openKeys={this.state.openKeys}
        onOpenChange={this.onOpenChange}
        selectedKeys={[this.state.current]}
        mode="inline">
        <SubMenu key="apps" title={<span><Icon type="appstore" /><span> <I18nText code='app.mgr'/></span></span>}>
          <Menu.Item key="1">
          	<Link to="/"><I18nText code="app.list"/></Link> 
          </Menu.Item>
        </SubMenu>
        <SubMenu key="configs" title={<span><Icon type="setting" /><span><I18nText code="config.mgr"/></span></span>}>
          <Menu.Item key="2">
          	<Link to="/configs"><I18nText code="config.list"/></Link> 
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/pushlogs"><I18nText code="config.push.logs"/></Link> 
          </Menu.Item>
        </SubMenu>
        <SubMenu key="cluster" title={<span><Icon type="desktop" /><span><I18nText code="cluster.mgr"/></span></span>}>
          <Menu.Item key="5">
          	<Link to="/servers"><I18nText code="cluster.servers"/></Link> 
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/clients"><I18nText code="cluster.clients"/></Link> 
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  },
});

LeftMenu.propTypes = {
};

export default LeftMenu;