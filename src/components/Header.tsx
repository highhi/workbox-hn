import * as React from 'react';
import { Link } from 'react-router-dom';

const Header: React.SFC = () => (
  <header>
    <h1>React HN</h1>
    <ul>
      <li><a>new</a></li>
      <li><a>comments</a></li>
      <li><a>show</a></li>
      <li><a>asd</a></li>
      <li><a>jobs</a></li>
    </ul>
  </header>
);

export default Header;
