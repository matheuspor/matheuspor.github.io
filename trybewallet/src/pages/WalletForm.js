import React from 'react';
import PropTypes from 'prop-types';

export default class WalletForm extends React.Component {
  makeButton(editItem) {
    const { editClick, onClick } = this.props;
    return (
      editItem
        ? <button type="button" onClick={ editClick }> Editar despesa </button>
        : <button type="button" onClick={ onClick }> Adicionar Despesa </button>
    );
  }

  makeDescription(callback) {
    return (
      <label htmlFor="desc">
        Descrição:
        <textarea
          name="description"
          id="desc"
          style={ { verticalAlign: 'top' } }
          onChange={ callback }
        />
      </label>
    );
  }

  render() {
    const { expense: { value }, wallet: { currencies }, onChange, editItem } = this.props;
    return (
      <form>
        <label htmlFor="valor">
          Valor:
          <input
            value={ value }
            onChange={ onChange }
            name="value"
            type="number"
            id="valor"
          />
        </label>
        {' '}
        <label htmlFor="moeda">
          Moeda:
          <select name="currency" id="moeda" onChange={ onChange }>
            {currencies
              && currencies.map((coin, index) => <option key={ index }>{coin}</option>)}
          </select>
        </label>
        {' '}
        <label htmlFor="pagamento">
          Método de pagamento:
          <select name="method" id="pagamento" onChange={ onChange }>
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito </option>
          </select>
        </label>
        {' '}
        <label htmlFor="tag">
          Tag:
          <select name="tag" id="tag" onChange={ onChange }>
            <option value="Alimentação"> Alimentação </option>
            <option value="Lazer"> Lazer </option>
            <option value="Trabalho"> Trabalho </option>
            <option value="Transporte"> Transporte </option>
            <option value="Saúde"> Saúde </option>
          </select>
        </label>
        {' '}
        {this.makeDescription(onChange)}
        {this.makeButton(editItem)}
      </form>);
  }
}

WalletForm.propTypes = {
  editClick: PropTypes.func.isRequired,
  editItem: PropTypes.bool.isRequired,
  expense: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
