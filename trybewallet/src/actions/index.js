import currenciesAPI from '../services/currenciesAPI';

export const USER_INFO = 'USER_INFO';
export const COIN_INFO = 'COIN_INFO';
export const EXPENSES = 'EXPENSES';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

export const setUserInfo = (payload) => ({
  type: USER_INFO, payload,
});
export const deleteItem = (payload) => ({ type: DELETE_ITEM, payload });
export const editItem = (payload) => ({ type: EDIT_ITEM, payload });
export const setCoins = (payload) => ({ type: COIN_INFO, payload });
export const setWallet = (payload) => ({ type: EXPENSES, payload });
export const setExpenses = (payload) => async (dispatch) => {
  payload.exchangeRates = await currenciesAPI();
  dispatch(setWallet(payload));
};

export const fetchCoins = () => async (dispatch) => {
  const response = await currenciesAPI();
  const array = Object.keys(response).filter((res) => res !== 'USDT');
  dispatch(setCoins(array));
};
