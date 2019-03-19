import axios from 'axios';
import { LoginToken } from '../store/ducks/login';

const api = axios.create({
  baseURL: 'http://35.198.17.69/api',
});

const tokenAuth = null;

const setToken = token => {
  console.tron.log(['peuei', token])
  axios.defaults.headers.common['X-Token']=`${token}`;
}

const user = {
  // realiza o login do usuario
  loginUser: data => {
    return api.post('/pericia/usuario/login', data, {
        headers: {}
      },
    )
  },
  // envia matricula pra receber codigo por email
  postCadastroId: data => {
    return api.post('/pericia/usuario/cadastro', data, {
        headers: {}
      },
    )
  },
  //confirma o pin recebido por email para validação do usuario
  postConferePIN: data => {
    return api.post('/pericia/usuario/validaPin', data, {
        headers: {}
      },
    )
  },

  createPassword: data => {
      return api.post('/pericia/usuario/geraSenha', data, {
        headers: {}
      },
    )
  },
  // requisição para ter historico de pericias
  getHist: data => {
    return api.post('/pericia/formulario/recebidos', null, {
        headers: {
          'matricula': data.id,
          // 'token': data.token,
        }
      },
    )
  },
}

const form = {
  // requisiçao para obter um novo pop atraves de um numero identificador
  getNewForm: number => {
    console.tron.log(['api ', LoginToken])
    return api.get(`/pericia/formularios/${number}`)
  },
  // requisição para enviar um formulario
  postForm: data => {
    return api.post('/pericia/formulario/envio', data.body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'matricula': data.matricula,
          'referencia': data.ref,
        }
      },
    )
  },
}

export default Api = {
  api,
  user,
  form,
  setToken,
};
