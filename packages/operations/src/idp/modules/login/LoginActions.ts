import BaseReduxActions from 'idpBase/ReduxStore/BaseReduxActions';
import LoginActionsTypes from './constants/LoginActionsTypes';
import {STORE_PATH} from './constants/LoginStatus';

class LoginActions extends BaseReduxActions {
}

export default new LoginActions(LoginActionsTypes, STORE_PATH);
