import {connect} from 'react-redux';
import {STORE_PATH} from '../constants/HomeStatus';

import HomeActions from '../HomeActions';
import HomeRootView from './HomeRootView';

import {ContainerPropsType} from '../constants/HomeTypes';

class HomeContainer extends React.PureComponent<ContainerPropsType> {
  public componentDidMount(): void {}

  public componentWillUnmount(): void {
    HomeActions.resetStoreData();
  }

  public render(): React.ReactNode {
    const {
      history,
      match,
      location,
      homeState,
    } = this.props;
    return (
      <HomeRootView
        history={history}
        match={match}
        location={location}
        isBlockLoading={homeState.get('isBlockLoading')}
      />
    );
  }
}

export default connect((state: Immutable.Map<string, any>) => ({
  homeState: state.getIn(STORE_PATH) || Immutable.Map(),
}))(HomeContainer);
