import ExtensiblePageTitle from 'idpBase/components/ExtensiblePageTitle';
import LoginActions from '../LoginActions';
import LoginLess from '../style/Login.less';

import {RootViewPropsType} from '../constants/LoginTypes';

class LoginRootView extends React.PureComponent<RootViewPropsType> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <ExtensiblePageTitle>登录页面</ExtensiblePageTitle>
      </React.Fragment>
    );
  }
}

export default LoginRootView;
