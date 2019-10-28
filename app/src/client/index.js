import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  render() {
    return <h1>Hello from Webchat</h1>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
