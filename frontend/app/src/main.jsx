import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from './store/authSlice.js';
import habitsReducer from './store/habitsSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer, 
    habits: habitsReducer
  },
});

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App /> 
    </Provider>
);
