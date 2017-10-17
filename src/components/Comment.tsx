import * as React from 'react';
import store, { IStory } from '../lib/store';

interface IState {
  childComments: IStory[];
}

interface IProps {
  comment: IStory;
}

export default class Comment extends React.Component<IProps, IState> {
  state: IState;

  constructor(props: IProps) {
    super();
    this.state = { childComments: [] };
  }

  componentDidMount() {
    store.fetchItems(this.props.comment.kids)
      .then(childComments => this.setState({ childComments }));
  }

  renderChildComments(): React.ReactChild {
    const comments = this.state.childComments.map(comment => <Comment key={comment.id} comment={comment} />);
    return <ul>{comments}</ul>
  }

  render() {
    const { comment } = this.props;

    return(
      <li>
        {comment.text}
        {comment.kids ?　this.renderChildComments() : null}
      </li>
    );
  }
}
