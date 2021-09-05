import { COIN_INFO, EXPENSES, DELETE_ITEM, EDIT_ITEM } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case COIN_INFO:
    return { ...state, currencies: payload };
  case EXPENSES:
    return { ...state, expenses: [...state.expenses, payload] };
  case EDIT_ITEM: {
    return {
      ...state,
      expenses: state.expenses.map(
        (item) => (item.id === payload.id ? payload : item),
      ) };
  }
  case DELETE_ITEM: {
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== payload.id),
    };
  }
  default:
    return state;
  }
};

export default wallet;
