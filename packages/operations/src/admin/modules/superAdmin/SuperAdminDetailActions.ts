import BaseReduxActions from 'base/ReduxStore/BaseReduxActions';
import SuperAdminDetailActionsTypes from './constants/SuperAdminDetailActionsTypes';
import {STORE_PATH} from './constants/SuperAdminDetailStatus';

class SuperAdminDetailActions extends BaseReduxActions {
}

export default new SuperAdminDetailActions(SuperAdminDetailActionsTypes, STORE_PATH);
