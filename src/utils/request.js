import axios from 'axios'
import { EnvironmentOption } from '../config';

const service = axios.create({
  baseURL: EnvironmentOption.BASE_API, // api 的 base_url
})

service.interceptors.response.use(function (response) {
  // Do something with response data
  return response.data;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default service;
