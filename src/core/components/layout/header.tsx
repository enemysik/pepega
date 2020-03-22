import React from 'react';
import {Link} from 'react-router-dom';
import {HeaderLink} from './types';

export type Props = { links?: HeaderLink[] }

export default function Header({links}: Props) {
  return (
    <nav className="navbar navbar-expand-sm bg-dark">
      <ul className="navbar-nav">
        {links?.map((l) =>
          <li key={l.route} className="nav-item">
            <Link className="nav-link text-white" to={l.route}>{l.name}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
