import { combineReducers } from 'redux';

import newState from './new';
import formState from './form';
import histState from './hist';
import groupState from './group';

export default combineReducers({
  newState,
  formState,
  histState,
  groupState,
});

/*empty: (state = {}) => state,*/
