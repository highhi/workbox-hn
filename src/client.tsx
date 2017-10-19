import * as React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import AppClient from './components/AppClient';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        registration.addEventListener('updatefound', event => console.info('update', event));
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  hydrate(
    <AppClient />,
    document.getElementById('app')
  );
});
