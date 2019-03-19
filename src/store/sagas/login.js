import Api from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as LoginActions } from '../ducks/login';

export function* getLoginRequest(action) {
  try {
    const response = yield call(Api.user.loginUser, { matricula: action.payload.data.inputSave, pass: action.payload.data.password });
    console.tron.log(response)
    if (response.status === 200) {
      yield put(LoginActions.getLoginSucsses(response.data, action.payload.data.inputSave));
    }    
  } catch{
    // console.tron.log("Deu ruim")
  }
}

