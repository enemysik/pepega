import React from 'react';
import pepega from './pepega.png';
import {RootState} from '../../../reducers';
import {connect, ConnectedProps} from 'react-redux';

const mapState = (state: RootState) => ({
  isSaving: state.core.isSaving,
});
const connector = connect(mapState);
type Props = ConnectedProps<typeof connector>;

export function Footer({isSaving}: Props) {
  const loader = isSaving ? <img height="32" src={pepega} alt="saving..." /> : null;
  return (
    <footer
      className="d-flex justify-content-between bg-dark text-white align-items-center p-2"
      style={{minHeight: '3rem'}}>
      <div>
        {loader}
      </div>
      <span>Powered by Enemysik</span>
    </footer>
  );
}
export default connector(Footer);
