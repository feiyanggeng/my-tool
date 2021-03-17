import ExtensiblePageTitle from 'portalBase/components/ExtensiblePageTitle';
import HomeActions from '../HomeActions';
import HomeLess from '../style/Home.less';

import {RootViewPropsType} from '../constants/HomeTypes';

class HomeRootView extends React.PureComponent<RootViewPropsType> {
  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <ExtensiblePageTitle></ExtensiblePageTitle>
      </React.Fragment>
    );
  }
}

export default HomeRootView;
