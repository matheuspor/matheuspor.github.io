import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletHeader from './WalletHeader';
import { deleteItem, editItem, fetchCoins, setExpenses } from '../actions';
import WalletForm from './WalletForm';
import WalletTable from './WalletTable';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        id: 0,
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      moeda: 'BRL',
      isEditing: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.editClick = this.editClick.bind(this);
  }

  componentDidMount() {
    const { sendCoin } = this.props;
    sendCoin();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        [name]: value,
      },
    }));
  }

  handleButton() {
    const { sendExpenses, wallet } = this.props;
    const { expense } = this.state;
    sendExpenses(expense);
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        id: wallet.expenses.length + 1,
      } }),
    () => {
    });
  }

  deleteItem(item) {
    const { deleteExpense, wallet } = this.props;
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        id: wallet.expenses.length - 1,
      } }),
    () => {
      deleteExpense(item);
    });
  }

  editItem(item) {
    this.setState({
      expense: item,
      isEditing: true });
  }

  editClick() {
    const { expense } = this.state;
    const { setEditedItem, wallet } = this.props;
    setEditedItem(expense);
    this.setState((prevState) => ({
      ...prevState,
      isEditing: false,
      expense: {
        ...prevState.expense,
        id: wallet.expenses.length,
      },
    }));
  }

  render() {
    const { wallet } = this.props;
    const { moeda, isEditing, expense } = this.state;
    return (
      <div>
        <header>
          <WalletHeader moeda={ moeda } />
          <br />
        </header>
        <WalletForm
          wallet={ wallet }
          onChange={ this.handleChange }
          onClick={ this.handleButton }
          editItem={ isEditing }
          expense={ expense }
          editClick={ this.editClick }
        />
        <WalletTable deleteItem={ this.deleteItem } editItem={ this.editItem } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  sendCoin: () => dispatch(fetchCoins()),
  sendExpenses: (expense) => dispatch(setExpenses(expense)),
  deleteExpense: (item) => dispatch(deleteItem(item)),
  setEditedItem: (item) => dispatch(editItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  deleteExpense: PropTypes.func.isRequired,
  sendCoin: PropTypes.func.isRequired,
  sendExpenses: PropTypes.func.isRequired,
  setEditedItem: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number,
  }),
};

Wallet.defaultProps = {
  wallet: {
    total: 0,
  },
};
