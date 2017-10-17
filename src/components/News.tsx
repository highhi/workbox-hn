import * as React from 'react';
import Item from './Item';
import store, { IStory } from '../lib/store';
import Loader from './Loader';
import Pagination from './Pagination';

interface IState {
  items: any[];
}

interface IProps extends IStory {
  items: IStory[];
}

export default class News extends React.PureComponent<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = { items: [] };
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
    store.on('topstories-updated', this.update);
  }

  componentWillUnmount() {
    store.removeListener('topstories-updated', this.update);
  }

  componentWillReceiveProps(nextProps: IProps) {
    const nextPage = nextProps.match.params.page;
    if (this.props.match.params.page === nextPage) return;
    this.update();
  }

  update(): void {
    store.loading(true);
    store.fetchByPage(this.props.match.params.page).then(items => {
      this.setState({ items });
      store.loading(false);
    }).catch(err => { throw new Error(err) });
  }

  renderItems(): React.ReactFragment {
    return this.state.items.map(item => (
      <Item
        key={item.id}
        title={item.title}
        url={item.url}
        commentsUrl={`/item/${item.id}`}
      />
    ));
  }

  render() {
    return [
      <Loader key="loader" />,
      <ul key="items">{this.renderItems()}</ul>,
      <Pagination key="pagination" page={Number(this.props.match.params.page)} />,
    ];
  }
}
