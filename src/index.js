
import React from 'react';
import ReactDom from 'react-dom';
import DemoScope from './Scope';
import DemoComposes from './Composes';
import DemoValues from './Values';
import DemoIcss from './Icss';

function App() {
  return (
    <div className="App">
      <DemoScope/>
      <hr/>
      <DemoComposes/>
      <hr/>
      <DemoValues/>
      <hr/>
      <DemoIcss/>
    </div>
  );
}

ReactDom.render(React.createElement(App), document.getElementById('root'));
