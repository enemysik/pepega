import React from 'react';
import Footer from './footer';

export default class Layout extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        {/* <header>Header</header> */}
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}