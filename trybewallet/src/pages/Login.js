import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setUserInfo } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: true,
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.checkButton = this.checkButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    this.checkButton();
  }

  checkButton() {
    const { email, password, buttonDisabled } = this.state;
    const MIN_PASS_LENGTH = 6;
    const isEmailValid = email.endsWith('.com') || email.endsWith('.br');
    if (isEmailValid && password.length >= MIN_PASS_LENGTH && buttonDisabled) {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
      buttonDisabled: true,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { history, setUser } = this.props;
    const { email } = this.state;
    setUser(email);
    history.push('/carteira');
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <div>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            onChange={ this.handleChange }
            placeholder="email"
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            onChange={ this.handleChange }
            placeholder="senha"
          />
        </div>
        <button
          type="button"
          disabled={ buttonDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUser: (email) => dispatch(setUserInfo(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
