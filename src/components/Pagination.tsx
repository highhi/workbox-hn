import * as React from 'react';
import { Link } from 'react-router-dom';

interface IPage {
  page: number;
}

const Next: React.SFC<IPage> = (props: IPage) => (
  <Link to={`/news/${props.page + 1}`}>Next</Link>
);

const Prev: React.SFC<IPage> = (props: IPage) => (
  props.page <= 1 ? null : <Link to={`/news/${props.page - 1}`}>Prev</Link>
);

export default class Pagination extends React.Component<IPage, IPage> {
  state: IPage;

  constructor(props: IPage) {
    super(props);
    this.state = { page: this.props.page };
  }

  componentWillReceiveProps(nextProps: IPage) {
    const nextPage = Number(nextProps.page);
    if (this.props.page === nextPage) return;
    this.setState({ page: nextPage });
  }

  render() {
    return(
      <div>
        <Prev page={this.state.page} />
        <span> | </span>
        <Next page={this.state.page} />
      </div>
    );
  }
}