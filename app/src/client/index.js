import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './UI/chat';

class App extends React.Component {
  render() {
    return (
      <div>
        <Chat />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
