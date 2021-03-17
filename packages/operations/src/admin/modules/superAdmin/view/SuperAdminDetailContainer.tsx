import {connect} from 'react-redux';
import {STORE_PATH} from '../constants/SuperAdminDetailStatus';

import SuperAdminDetailActions from '../SuperAdminDetailActions';
import SuperAdminDetailRootView from './SuperAdminDetailRootView';

import {ContainerPropsType} from '../constants/SuperAdminDetailTypes';

class SuperAdminDetailContainer extends React.PureComponent<ContainerPropsType> {
  public componentDidMount(): void {}

  public componentWillUnmount(): void {
    SuperAdminDetailActions.resetStoreData();
  }

  public render(): React.ReactNode {
    const {
      history,
      match,
      location,
      superAdminDetailState,
    } = this.props;
    return (
      <SuperAdminDetailRootView
        history={history}
        match={match}
        location={location}
        isBlockLoading={superAdminDetailState.get('isBlockLoading')}
      />
    );
  }
}

export default connect((state: Immutable.Map<string, any>) => ({
  superAdminDetailState: state.getIn(STORE_PATH) || Immutable.Map(),
}))(SuperAdminDetailContainer);
