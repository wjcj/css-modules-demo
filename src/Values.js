import React from 'react';
import styles from "./text.module.css";

const Demo = () => {
  return (
    <div>
      变量：<br/>
      <p className={styles.textPrimary}>这是一段话...</p>
      <p className={styles.textSecondary}>这是一段话...</p>
      <p className={styles['secondary-color']}>这是一段话...</p>
    </div>
  )
}

export default Demo;