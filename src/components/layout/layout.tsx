import React from 'react';
import {Footer} from './footer';
import {Header, IHeaderProps} from './header';

export class Layout extends React.Component<ILayoutProps> {
  render(): JSX.Element {
    return (
      <div className="d-flex flex-column">
        <Header links={this.props.links} />
        <main className="container-fluid">{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}
export interface ILayoutProps extends IHeaderProps {

}
