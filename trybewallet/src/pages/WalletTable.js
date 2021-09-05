import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletTable extends React.Component {
  makeButton(item) {
    const { deleteItem, editItem } = this.props;
    return (
      <>
        <button
          type="button"
          data-testid="delete-btn"
          onClick={ () => deleteItem(item) }
        >
          Deletar
        </button>
        <button
          type="button"
          data-testid="edit-btn"
          onClick={ () => editItem(item) }
        >
          Editar
        </button>
      </>
    );
  }

  makeTable(expenses) {
    if (expenses.length) {
      return expenses.map((item) => (
        <tr key={ item.id }>
          <td>
            {item.description}
          </td>
          <td>
            {item.tag}
          </td>
          <td>
            {item.method}
          </td>
          <td>
            {item.value}
          </td>
          <td>
            {item.exchangeRates[item.currency].name}
          </td>
          <td>
            {parseFloat((item.exchangeRates[item.currency].ask)).toFixed(2)}
          </td>
          <td>
            {parseFloat(
              (item.exchangeRates[item.currency].ask * item.value
              ),
            ).toFixed(2)}
          </td>
          <td>
            Real
          </td>
          <td>
            {this.makeButton(item)}
          </td>
        </tr>
      ));
    }
  }

  render() {
    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th> Descrição </th>
            <th> Tag </th>
            <th> Método de pagamento </th>
            <th> Valor </th>
            <th> Moeda </th>
            <th> Câmbio utilizado </th>
            <th> Valor convertido </th>
            <th> Moeda de conversão </th>
            <th> Editar/Excluir </th>
          </tr>
        </thead>
        <tbody>
          {this.makeTable(expenses)}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletTable);

WalletTable.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
