import React from 'react';
import styles from "./btn.module.css";

const DemoComposes = () => {
  return (
    <div>
      组合：<br/>
      <button className={styles.btn}>Button</button>
      <button className={styles.btnPrimary}>Primary Button</button>
      <button className={styles.btnDanger}>Danger Button</button>
      <br/>
      <button className={styles.btnSmall}>Small Button</button>
      <button className={styles.btnMiddle}>Middle Button</button>
      <button className={styles.btnLarge}>Large Button</button>
      <br/>
      <button className={styles.btnCircle}>Circle</button>
    </div>
  )
}

export default DemoComposes;