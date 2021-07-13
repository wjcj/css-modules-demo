import React from 'react';
import styles1 from "./header.module.sass";
import styles2 from "./header.sass";
import logo from './logo.png';

console.log('styles1', styles1);
console.log('styles2', styles2);

const Logo = ({ height }) => (
  <img style={{ height, width: height }} src={logo} />
);

const Demo = () => {
  return (
    <div className={styles1.className}>
      <Logo height={styles1.height} />
    </div>
  );
};

export default Demo;