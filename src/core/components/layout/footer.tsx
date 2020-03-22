import React from 'react';

export default class Footer extends React.Component {
  render(): JSX.Element {
    return (
      <footer
        className="d-flex justify-content-between bg-dark text-white align-items-center p-2"
        style={{minHeight: '3rem'}}>
        <span>Pepega</span>
        <span>Powered by Enemysik</span>
      </footer>
    );
  }
}
