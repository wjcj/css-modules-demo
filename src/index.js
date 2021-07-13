
import React from 'react';
import ReactDom from 'react-dom';
import DemoScope from './Scope';
import DemoComposes from './Composes';
import DemoValues from './Values';
import DemoIcss from './Icss';
import DemoSass from './Sass';

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
      <hr/>
      <DemoSass/>
    </div>
  );
}

ReactDom.render(React.createElement(App), document.getElementById('root'));
