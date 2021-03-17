import BaseActionTypesCreator from 'idpBase/ReduxStore/BaseActionTypesCreator';
import {STORE_PATH} from './LoginStatus';

const types = {
};
const LoginActionsTypes = BaseActionTypesCreator(_.last(STORE_PATH), types);

export default LoginActionsTypes;
