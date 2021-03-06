import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../reducers';
import {loginFetchUsers, loginLogin, selectLogin} from './actions';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {password: ''};
  }
  componentDidMount() {
    this.props.fetchData();
  }
  get logins() {
    return this.props.logins.map((l) =>
      <option key={l.id} value={l.id}>{l.name}</option>);
  }
  onSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.props.signIn(this.props.selectedLogin, this.state.password);
  }
  onLoginChange(e: React.ChangeEvent<HTMLSelectElement>) {
    this.props.setSelectedLogin(Number(e.target.value));
  }
  onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({password: e.target.value});
  }
  render(): JSX.Element {
    if (this.props.isAuthenticated) return <Redirect to="/" />;
    const error = this.props.loginError ?
      <div className="alert alert-danger">{this.props.loginError}</div> :
      null;
    return (
      <main>
        <form onSubmit={(e) => this.onSubmit(e)}>
          <div className="form-group">
            <label>Пользователь: </label>
            <select
              className="form-control"
              onChange={(e) => this.onLoginChange(e)}
              value={this.props.selectedLogin}>
              {this.logins}
            </select>
          </div>
          <div className="form-group">
            <label>Пароль: </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => this.onPasswordChange(e)} />
          </div>
          {error}
          <button
            type="submit"
            className="btn btn-outline-primary">Вход</button>
        </form>
      </main>
    );
  }
}

const mapState = (state: RootState) => ({
  logins: state.modules.login.logins,
  selectedLogin: state.modules.login.selectedLogin,
  loginError: state.modules.login.loginError,
  isAuthenticated: state.authentication.isAuthenticated,
});
const mapDispatch = (dispatch: any) => ({
  fetchData: () => dispatch(loginFetchUsers()),
  signIn: (userId: number, password: string) =>
    dispatch(loginLogin(userId, password)),
  setSelectedLogin: (userId: number) => dispatch(selectLogin(userId)),
});

const connector = connect(mapState, mapDispatch);

interface ILoginState {
  password: string; // MB move to redux
}
type ILoginProps = ConnectedProps<typeof connector>;
export default connector(Login);
