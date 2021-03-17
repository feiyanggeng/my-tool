import BaseReduxReducer from 'portalBase/ReduxStore/BaseReduxReducer';
import HomeActionsTypes from './constants/HomeActionsTypes';

import {MappingPropsType} from './constants/HomeTypes';

type State = ImmutableMap<MappingPropsType> & Immutable.Map<string, any>;

class HomeReducer extends BaseReduxReducer {
  getInitialState(): State {
    return Immutable.fromJS({
      isBlockLoading: true,
    });
  }
}

export default new HomeReducer(HomeActionsTypes);
