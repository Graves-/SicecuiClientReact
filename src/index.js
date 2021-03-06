import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-typist/dist/Typist.css';
import './style.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
