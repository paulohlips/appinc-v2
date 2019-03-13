import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.198.17.69/api',
});

const user = {
  getHist: id =>{ console.tron.log(id); return api.post('/pericia/formulario/recebidos', { matricula: id })},
}

export default Api = {
  user, 
};
