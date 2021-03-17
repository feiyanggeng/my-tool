import BaseReduxReducer from 'idpBase/ReduxStore/BaseReduxReducer';
import LoginActionsTypes from './constants/LoginActionsTypes';

import {MappingPropsType} from './constants/LoginTypes';

type State = ImmutableMap<MappingPropsType> & Immutable.Map<string, any>;

class LoginReducer extends BaseReduxReducer {
  getInitialState(): State {
    return Immutable.fromJS({
      isBlockLoading: true,
    });
  }
}

export default new LoginReducer(LoginActionsTypes);
