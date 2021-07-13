import React from 'react';
import styles from "./icss.css";

const { headerHeight, headerName } = styles;

const Demo = () => {
  return (
    <div className={`${headerName} border-theme`} style={{ height: headerHeight }}>
      <span className="logo">logo</span>
    </div>
  )
}

export default Demo;