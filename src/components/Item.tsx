import * as React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  url: string;
  title: string;
  commentsUrl: string;
}

const Item: React.SFC<IProps> = (props: IProps) => (
  <li>
    <a href={props.url}>{props.title}</a>
    <Link to={props.commentsUrl}>comments</Link>
  </li>
);

export default Item;
