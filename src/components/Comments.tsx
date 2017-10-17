import * as React from 'react';
import Comment from './Comment';
import store, { IStory } from '../lib/store';

type IProps = IStory;

interface IState {
  comments: IStory[];
}

export default class Comments extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    store.fetchItem(this.props.match.params.id)
      .then(item => store.fetchItems(item.kids))
      .then(comments => this.setState({ comments }))
      .catch(err => { throw new Error(err) });
  }

  renderComments() {
    return this.state.comments.map(comment => <Comment key={comment.id} comment={comment} />);
  }

  render() {
    return <ul>{this.renderComments()}</ul>;
  }
}
