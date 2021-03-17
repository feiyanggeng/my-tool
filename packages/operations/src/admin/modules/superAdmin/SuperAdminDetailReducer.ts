import BaseReduxReducer from 'base/ReduxStore/BaseReduxReducer';
import SuperAdminDetailActionsTypes from './constants/SuperAdminDetailActionsTypes';

import {MappingPropsType} from './constants/SuperAdminDetailTypes';

type State = ImmutableMap<MappingPropsType> & Immutable.Map<string, any>;

class SuperAdminDetailReducer extends BaseReduxReducer {
  getInitialState(): State {
    return Immutable.fromJS({
      isBlockLoading: true,
    });
  }
}

export default new SuperAdminDetailReducer(SuperAdminDetailActionsTypes);
