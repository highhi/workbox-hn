import * as React from 'react';
import * as ReactDom from 'react-dom';
import store from '../lib/store';
import { canUseDom } from '../util';

interface IState {
  loading: boolean;
}

export default class Loader extends React.Component<{}, IState> {
  loading: IState;
  root: HTMLElement | null;

  constructor() {
    super();
    this.state = { loading: false };
    this.update = this.update.bind(this);
    this.root = canUseDom ? document.getElementById('loader-root') : null;
  }

  componentWillMount() {
    store.on('loading', this.update);
  }

  componentWillUnmount() {
    store.removeListener('loading', this.update);
  }

  update(loading: boolean): void {
    this.setState({ loading });
  }

  render() {
    if (!this.state.loading || !this.root) return null;

    return ReactDom.createPortal(
      <div>Loading...</div>,
      this.root,
    );
  }
}
