import api from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as LoginActions } from '../ducks/login';

export function* getLoginRequest(action) {
  try {
    const response = yield call(api, '/pericia/usuario/login',{
      method: 'post',
      data: { matricula: action.payload.data.inputSave, pass: action.payload.data.password },
    });
    yield put(LoginActions.getLoginSucsses(response.data, action.payload.data.inputSave));
  } catch{
    console.tron.log("Deu ruim")
  }
}

