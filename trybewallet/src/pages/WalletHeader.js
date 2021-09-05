import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  render() {
    const { user: { email }, total, moeda } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          Email:
          {' '}
          {email}
        </span>
        {' '}
        |
        {' '}
        <span data-testid="total-field">
          Despesa Total: R$
          {total}
        </span>
        {' '}
        <span data-testid="header-currency-field">
          {moeda}
        </span>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  // Consultei o repositório do Rafael Nery para o cálculo do total.
  // https://github.com/tryber/sd-013-b-project-trybewallet/blob/rafael-nery-machado-trybewallet-project/src/components/Header/index.jsx
  total: state.wallet.expenses.reduce((acc, { value, currency, exchangeRates }) => (
    acc + parseFloat(value * exchangeRates[currency].ask)
  ), 0).toFixed(2),
});

export default connect(mapStateToProps)(WalletHeader);

WalletHeader.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  total: PropTypes.string,
  moeda: PropTypes.string.isRequired,
};

WalletHeader.defaultProps = {
  total: 0,
};
