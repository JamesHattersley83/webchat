import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Chat from './UI/chat';
import { Provider } from 'react-redux';
import store from './store/store';

class App extends React.Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Chat />
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
