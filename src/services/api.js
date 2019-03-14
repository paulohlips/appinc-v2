import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.198.17.69/api',
});

const user = {
  // requisição para ter historico de pericias
  getHist: id => { 
    console.tron.log(id); 
    return api.post('/pericia/formulario/recebidos', { matricula: id })
  },
}

const form = {
  // requisiçao para obter um novo pop atraves de um numero identificador
  getNewForm: number => {     
    return api.get(`/pericia/formularios/${number}`)
  },
  // requisição para enviar um formulario
  postForm: data => {
    console.tron.log(data);  
    return api.post('/pericia/formulario/recebidos', data.body,
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
};
