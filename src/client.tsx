import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AppClient from './components/AppClient';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(err => {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <AppClient />,
    document.getElementById('app')
  );
});
