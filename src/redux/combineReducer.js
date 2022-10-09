import {combineReducers} from 'redux';
import {account_reducer} from './account/reducer';
import {Register_Reducer, otpVerification} from './auth/reducer';
import {bank_reducer} from './bank/reducer';
import {dispute_Reducer} from './dispute/reducer';
import {industry_reducer} from './industry/reducer';
import {product_reducer} from './product/reducer';
import {transaction_reducer} from './transaction/reducer';
import {wallet_reducer} from './wallet/reducer';

export default combineReducers({
  auth: Register_Reducer,
  account: account_reducer,
  industry: industry_reducer,
  transaction: transaction_reducer,
  product: product_reducer,
  bank: bank_reducer,
  dispute: dispute_Reducer,
  wallet: wallet_reducer,
});
