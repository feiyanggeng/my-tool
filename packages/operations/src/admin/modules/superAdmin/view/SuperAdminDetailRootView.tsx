import ExtensiblePageTitle from 'base/components/ExtensiblePageTitle';
import SuperAdminDetailActions from '../SuperAdminDetailActions';
import SuperAdminDetailLess from '../style/SuperAdminDetail.less';

import {RootViewPropsType} from '../constants/SuperAdminDetailTypes';

class SuperAdminDetailRootView extends React.PureComponent<RootViewPropsType> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <ExtensiblePageTitle>管理员页面</ExtensiblePageTitle>
      </React.Fragment>
    );
  }
}

export default SuperAdminDetailRootView;
