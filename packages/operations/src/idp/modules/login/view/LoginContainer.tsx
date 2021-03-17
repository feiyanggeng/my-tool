import {connect} from 'react-redux';
import {STORE_PATH} from '../constants/LoginStatus';

import LoginActions from '../LoginActions';
import LoginRootView from './LoginRootView';

import {ContainerPropsType} from '../constants/LoginTypes';

class LoginContainer extends React.PureComponent<ContainerPropsType> {
  public componentDidMount(): void {}

  public componentWillUnmount(): void {
    LoginActions.resetStoreData();
  }

  public render(): React.ReactNode {
    const {
      history,
      match,
      location,
      loginState,
    } = this.props;
    return (
      <LoginRootView
        history={history}
        match={match}
        location={location}
        isBlockLoading={loginState.get('isBlockLoading')}
      />
    );
  }
}

export default connect((state: Immutable.Map<string, any>) => ({
  loginState: state.getIn(STORE_PATH) || Immutable.Map(),
}))(LoginContainer);
