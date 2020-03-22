import React from 'react';
import Footer from './footer';
import Header, {Props as HeaderProps} from './header';

type Props = HeaderProps;

export class Layout extends React.Component<Props> {
  render(): JSX.Element {
    return (
      <div className="d-flex flex-column" style={{minHeight: '100vh'}}>
        <Header links={this.props.links} />
        <main className="container-fluid" style={{flexGrow: 1}}>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}
