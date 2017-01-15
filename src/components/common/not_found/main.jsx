import React from 'react';
import { Button } from 'antd';
import styles from './main.less';
import I18nText from '../i18n_text/main';

const NotFound = () => {
  return (
    <div className={styles.normal}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.desc}>
          <I18nText code="404" />
        </p>
        <a href="/">
        	<Button type="primary" style={{ marginTop: 5 }}>
            <I18nText code="back.home" /> 
          </Button>
    	</a>
      </div>
    </div>
  );
};

export default NotFound;
