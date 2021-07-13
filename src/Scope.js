import React from 'react';
import styles from "./content.module.css";

const DemoScope = () => {
  return (
    <div>
      作用域：
      <h3 className={styles.title}>局部作用域</h3>
      <h3 className="title">全局作用域</h3>
    </div>
  )
}

export default DemoScope;