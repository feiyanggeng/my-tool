import BaseActionTypesCreator from 'base/ReduxStore/BaseActionTypesCreator';
import {STORE_PATH} from './SuperAdminDetailStatus';

const types = {
};
const SuperAdminDetailActionsTypes = BaseActionTypesCreator(_.last(STORE_PATH), types);

export default SuperAdminDetailActionsTypes;
