import BaseReduxActions from 'portalBase/ReduxStore/BaseReduxActions';
import HomeActionsTypes from './constants/HomeActionsTypes';
import {STORE_PATH} from './constants/HomeStatus';

class HomeActions extends BaseReduxActions {
}

export default new HomeActions(HomeActionsTypes, STORE_PATH);
