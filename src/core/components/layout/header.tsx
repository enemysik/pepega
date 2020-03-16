import React from 'react';
import {Link} from 'react-router-dom';

export class Header extends React.Component<IHeaderProps> {
  render() {
    const links = this.props.links?.map((l) =>
      <li key={l.route} className="nav-item"><Link className="nav-link" to={l.route}>{l.name}</Link></li>
    );
    return (<nav className="navbar navbar-expand-sm bg-dark">
      <ul className="navbar-nav">
        {links}
      </ul>
    </nav>);
  }
}
export interface HeaderLink {
  route: string;
  name: string;
}
export interface IHeaderProps {
  links?: HeaderLink[]
}
