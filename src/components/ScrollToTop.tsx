import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { canUseDom } from '../util';

interface IProps {
  location: Location;
  children: React.ReactChild;
}

class ScrollToTop extends React.Component<IProps & RouteComponentProps<any>> {
  componentDidUpdate(prevProps: IProps) {
    if (!canUseDom) return;
    if (this.props.location === prevProps.location) return;
    window.scrollTo(0, 0);
  }

  render() {
    return this.props.children;
  }
}

export default withRouter<any>(ScrollToTop);
