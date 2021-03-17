import BaseActionTypesCreator from 'portalBase/ReduxStore/BaseActionTypesCreator';
import {STORE_PATH} from './HomeStatus';

const types = {
};
const HomeActionsTypes = BaseActionTypesCreator(_.last(STORE_PATH), types);

export default HomeActionsTypes;
