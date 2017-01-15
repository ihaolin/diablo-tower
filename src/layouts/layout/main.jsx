import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './main.less';
import LeftMenu from '../left_menu/main';
import TopHeader from '../top_header/main';
import Footer from '../footer/main';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>
        <TopHeader />
      </div>
      <div className={styles.content}>
        <div className={styles.side}>
          <LeftMenu />
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
