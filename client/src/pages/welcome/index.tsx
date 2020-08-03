import React from 'react';
// import { Card } from 'antd';

import styles from './welcome.less';


const Welcome: React.FC = () => (
  <div className={styles.text}>欢迎</div>
)

export default React.memo(Welcome);