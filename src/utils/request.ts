import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { User } from 'oidc-client-ts';

function getUser() {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${import.meta.env.MATE_AUTHORITY}:${import.meta.env.MATE_CLIENT_ID}`,
  );
  console.log(`oidc.user:${import.meta.env.MATE_AUTHORITY}:${import.meta.env.MATE_CLIENT_ID}`);
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage);
}

const service = axios.create({
  // 公共接口
  baseURL: import.meta.env.MATE_BACKEND_BASE_PATH as string,
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  config => {
    // 发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    // 每次发送请求之前判断pinia中是否存在token,如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    const token = getUser()?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * @description: 封装get请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<T>} 返回的接口数据
 */
const get = <T>(url: string, params?: string | object, config?: AxiosRequestConfig): Promise<T> => {
  config = {
    method: 'get', // `method` 是创建请求时使用的方法
    url, // `url` 是用于请求的服务器 URL
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return service(config);
};

/**
 * @description: 封装post请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<T>} 返回的接口数据
 */
const post = <T>(url: string, data?: string | object, config?: AxiosRequestConfig): Promise<T> => {
  config = {
    method: 'post',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return service(config);
};

/**
 * @description: 封装patch请求方法
 * @param {string} url url 请求地址
 * @param {string | object} data 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<T>} 返回的接口数据
 */
const put = <T>(url: string, data?: string | object, config?: AxiosRequestConfig): Promise<T> => {
  config = {
    method: 'put',
    url,
    ...config,
  };
  if (data) {
    config.data = data;
  }
  return service(config);
};

/**
 * @description: 封装delete请求方法
 * @param {string} url url 请求地址
 * @param {string | object} params 请求参数
 * @param {AxiosRequestConfig} config 请求配置
 * @return {Promise<T>} 返回的接口数据
 */
const remove = <T>(url: string, params?: string | object, config?: AxiosRequestConfig): Promise<T> => {
  config = {
    method: 'delete',
    url,
    ...config,
  };
  if (params) {
    config.params = params;
  }
  return service(config);
};

// 包裹请求方法的容器,使用 http 统一调用
const request = {
  get,
  post,
  put,
  delete: remove,
};

export default request;
